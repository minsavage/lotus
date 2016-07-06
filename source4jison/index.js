/**
 * Created by danney on 16/6/25.
 */
var R = require('ramda');
var fs = require('fs');
var pathUtil = require('path');
var stringify = require('./util/stringify');

var keys = ['model', 'operator', 'viewModel', 'viewController'];

var loadParser = function () {
    return [
        require("./parser/model").parser,
        require("./parser/operator").parser,
        require("./parser/viewModel").parser,
        require("./parser/viewController").parser
    ]
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
    R.map(x=>R.bind(x.parse, x)),
    loadParser
);

var trace = R.tap((x)=>{console.log(x)})

var start = function (baseDir) {
    var modelsContainer = loadModels(baseDir);
    var parsers = initParsers();

    //var parseModelByKey = R.converge(R.map, [R.prop(R.__, parsers), R.prop(R.__, modelsContainer)]);
    
    //var parseModelByKey = function (key) {
    //    var models = modelsContainer[key];
    //    var parse = parsers[key];
    //    //var ret = R.map(parse, models);
    //    var ret = [];
    //    for(var i =0; i < models.length; i++) {
    //
    //        ret[i] = parse(models[i]);
    //    }
    //    return ret;
    //}

    //var x = R.map(parseModelByKey, keys);

    for(var k in keys) {
        var key = keys[k];

        var models = modelsContainer[key];
        var parse = parsers[key];
        var sss = [];
        for(var j in models) {
            var m = models[j];
            var x = parse(m);
            sss.push(x);
        }

        //var ret = R.map(parse, models);

        var x= 1;

        //var ret = parseModelByKey(key);

    }

    console.log(x);
}



var projectDir = '../project/ich0521';
start(projectDir);



//var parsers = [
//    require("./parser/model").parser.parse,
//    require("./parser/operator").parser.parse,
//    require("./parser/viewModel").parser.parse,
//    require("./parser/viewController").parser.parse
//]




//var model = require('../project/ich0521/viewController/postsViewController');
//var str = stringify(model);
//
//var comment = require('../project/ich0521/model/comment');
//var modelStr = stringify(comment);
//
////var parser =
////var ret = parser.parse(str);
//
////var modelParser =
////var modelRet = modelParser.parse(modelStr);
//
//
//var operatorModel = require('../project/ich0521/operator/postsOperator');
//var operatorModelStr = stringify(operatorModel);
//
//var operatorParser =
//var modelRet = operatorParser.parse(operatorModelStr);
//
//var viewModel = require('../project/ich0521/viewModel/postsViewModel');
//var viewModelStr = stringify(viewModel);
//
//var viewModelParser =
//var modelRet = viewModelParser.parse(viewModelStr);


//var translator = require('./translator/class');
//var ret = translator.translate(ret);
//
//var fs = require('fs');
//fs.writeFileSync('test.java', modelRet);

//console.log(ret);