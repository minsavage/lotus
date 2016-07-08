/**
 * Created by danney on 16/6/25.
 */
var R = require('ramda');
var fs = require('fs');
var pathUtil = require('path');
var stringify = require('./util/stringify');

var keys = ['model', 'operator', 'viewModel', 'viewController'];

var loadParser = function () {
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

var pathResolve = R.curry(function (modelPath, fileName) {
    return pathUtil.resolve(modelPath, fileName);
});

var filterJsFile = R.compose(R.equals('.js'), pathUtil.extname);

var fileNamesFromDir = R.compose(R.filter(filterJsFile), fs.readdirSync);

var filePathToModel = R.compose(stringify, require);

var mapModelDirNameToModels = function (baseDir, modelDirName) {
    var dirPath = pathUtil.resolve(baseDir, modelDirName);
    var fileNames = fileNamesFromDir(dirPath);
    var filesPath = R.map(pathResolve(dirPath), fileNames);
    var models = R.map(filePathToModel, filesPath);
    return models;
};

var loadModels = R.compose(
    R.zipObj(keys),
    R.map(R.__, keys),
    R.curry(mapModelDirNameToModels)
);

var initParsers = R.compose(
    R.zipObj(keys),
    loadParser
);

var startParse = R.curry(function (parser, util, model) {
    parser.yy.class = util.createClass();
    parser.yy.onCreate = '';
    parser.yy.onCreateView = '';
    parser.yy.onDestroy = '';
    return parser.parse(model);
});

var start = function (baseDir) {
    var modelsContainer = loadModels(baseDir);
    var parsers = initParsers();

    var parseModelsByKey = function (key) {
        var models = modelsContainer[key];
        var parser = parsers[key].parser;
        var util = parsers[key].util;

        var parseWithUtil = startParse(parser, util);

        return R.map(parseWithUtil, models)
    }

    var x = R.map(parseModelsByKey, keys);
    x = R.zipObj(keys)(x);


    //var m = x[3][1];

    //var classLoader = require('./type/classLoader');
    //classLoader.init(x);
    //
    //var translate = require('./translator/class').translate;
    //translate(m);

    console.log(x);
}


var projectDir = '../project/ich0521';
start(projectDir);