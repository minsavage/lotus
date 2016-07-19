/**
 * Created by danney on 16/6/25.
 */
'use strict'
let R = require('ramda');
let fs = require('fs');
let pathUtil = require('path');
let stringify = require('./util/stringify');
let mkdirp = require('mkdirp');

let keys = ['model', 'operator', 'viewModel', 'viewController'];

let loadParser = function () {
    return [{
        parser: require("./parser/model").parser,
        util: require("./parserUtil/modelUtil")
    }, {
        parser: require("./parser/operator").parser,
        util: require("./parserUtil/operatorUtil")
    }, {
        parser: require("./parser/viewModel").parser,
        util: require("./parserUtil/vmUtil")
    }, {
        parser: require("./parser/viewController").parser,
        util: require("./parserUtil/vcUtil")
    }]
}

let pathResolve = R.curry(function (modelPath, fileName) {
    return pathUtil.resolve(modelPath, fileName);
});

let filterJsFile = R.compose(R.equals('.js'), pathUtil.extname);

let fileNamesFromDir = R.compose(R.filter(filterJsFile), fs.readdirSync);

let filePathToModel = R.compose(stringify, require);

let mapModelDirNameToModels = function (baseDir, modelDirName) {
    let dirPath = pathUtil.resolve(baseDir, modelDirName);
    let fileNames = fileNamesFromDir(dirPath);
    let filesPath = R.map(pathResolve(dirPath), fileNames);
    let models = R.map(filePathToModel, filesPath);
    return models;
};

let loadModels = R.compose(
    R.zipObj(keys),
    R.map(R.__, keys),
    R.curry(mapModelDirNameToModels)
);

let initParsers = R.compose(
    R.zipObj(keys),
    loadParser
);

let startParse = R.curry(function (parser, util, model) {
    parser.yy.class = util.createClass();
    parser.yy.onCreate = '';
    parser.yy.onCreateView = '';
    parser.yy.onDestroy = '';
    return parser.parse(model);
});

let parseModelsByKey = R.curry(function (modelsContainer, parsers, key) {
    let parser = parsers[key].parser;
    parser.yy.serviceMethods = [];
    let util = parsers[key].util;
    let parseWithUtil = startParse(parser, util);
    let models = modelsContainer[key];
        
    let ret = R.map(parseWithUtil, models);

    if(key == 'operator') {
        let methods = parser.yy.serviceMethods;
        util.createRemoteServiceInterface(methods, ret);
    }
    return ret;
});

let start = function (baseDir, outputDir, pkgName) {
    let modelsContainer = loadModels(baseDir);
    let parsers = initParsers();
    let ret = R.map(parseModelsByKey(modelsContainer, parsers), keys);

    let astContainer = R.zipObj(keys)(ret);
    let classLoader = require('./type/classLoader');
    classLoader.init(astContainer);

    ret = R.map(function(astList){
        let names = R.map(R.prop('name'), astList);
        let codes = R.map(parseAST(pkgName), astList);
        let ret = R.zip(names, codes);
        return ret;
    }, ret)

    ret = R.zip(keys)(ret);

    let write = R.map(writeFiles(outputDir));
    write(ret);

    console.log('------------done--------------');
}

let parseAST = R.curry(function(pkgName, ast) {
    let parse = require('./parserAST/class').parse;
    let code = parse(ast);

    let parseImport = require('./parserAST/import').parse;
    let imports = parseImport(pkgName, ast.import);
    
    return R.trim(imports + '\r\r' + code);
});

let writeFiles = R.curry(function (baseDir, pair) {
    let key = pair[0];
    let dirPath = pathUtil.resolve(baseDir, key);
    let contents = pair[1];

    let pkgName = 'package com.y2go.ich.' + key + ';\r\r';

    if(!fs.existsSync(dirPath)) {
        mkdirp(dirPath, function(){
            R.map(writeFile(dirPath, pkgName), contents);
        })
    }
    else {
        R.map(writeFile(dirPath, pkgName), contents);
    }
})

let writeFile = R.curry(function (dir, pkgName, pair) {
    let fileName = pair[0] + '.java';
    let filePath = pathUtil.resolve(dir, fileName);
    let content = pkgName + pair[1];
    fs.writeFileSync(filePath, content);
})

let projectDir = '../project/ich0521';
let outputDir = '../output/ich0719/ich/app/src/main/java/com/y2go/ich';
let pkgName = 'com.y2go.ich';
start(projectDir, outputDir, pkgName);