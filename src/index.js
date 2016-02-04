/**
 * Created by danney on 16/1/15.
 */
var fs = require('fs');
var globalConfig = require('./globalConfig');
var projectLoader = require('./projectLoader');
var modelDataMgr = require('./modelDataMgr');
var baseBuilderMgr = require('./builderMgr/baseBuilderMgr');
var stringUtil = require('./util/stringUtil');
var widgetMgr = require('./widgetMgr');


globalConfig.packageName = 'com.soundario.dreamcloud';

//globalConfig.outputPath = __dirname + '/output/';
globalConfig.outputPath = '/Users/danney/dev/lotus/androidTestProject/DreamCloud/app/src/main/java/com/soundario/dreamcloud/';
if(!fs.existsSync(globalConfig.outputPath)) {
    fs.mkdirSync(globalConfig.outputPath);
}

globalConfig.outputResPath = '/Users/danney/dev/lotus/androidTestProject/DreamCloud/app/src/main/res/layout/';
if(!fs.existsSync(globalConfig.outputResPath)) {
    fs.mkdirSync(globalConfig.outputResPath);
}

projectLoader.load('../exp/project3');

var models = modelDataMgr.getModels();
baseBuilderMgr.build('model', models);

//baseBuilderMgr.build('operator', operators);
var operators = modelDataMgr.getOperators();
var modelOperatorBuilderMgr = require('./builderMgr/modelOperatorBuilderMgr');
modelOperatorBuilderMgr.build(operators);

var viewModels = modelDataMgr.getViewModels();
baseBuilderMgr.build('viewModel', viewModels);

var viewControllers = modelDataMgr.getViewControllers();
baseBuilderMgr.build('viewController', viewControllers);

var layoutBuilderMgr = require('./builderMgr/layoutBuilderMgr');
layoutBuilderMgr.build(viewControllers);

var pageBuilderMgr = require('./builderMgr/pageBuilderMgr');
var pages = modelDataMgr.getPages();
pageBuilderMgr.build(pages);