/**
 * Created by danney on 16/2/4.
 */
var fs = require('fs');
var lotus = require('./lotus');
var path = require('path');
var modelMgr = lotus.modelMgr;
var builderMgr = lotus.builderMgr;
var projectConfig = lotus.projectConfig;
var mkdirp = require('mkdirp');

var startBuild = function() {
    //pages
    var models = modelMgr.getPages();
    var Builder = builderMgr.queryPageBuilder();
    var builder = new Builder();
    for(var k in models) {
        var model = models[k];
        var content = builder.parse(model);
        var fileName = lotus.util.nameUtil.pageToActivityName(model.name) + '.java';
        var p = path.join(projectConfig.getSrcDir(), 'activity', fileName);
        saveFile(p, content);
    }

    //models
    var models = modelMgr.getModels();
    var Builder = builderMgr.queryModelBuilder();
    var builder = new Builder();
    for(var k in models) {
        var model = models[k];
        var content = builder.parse(model);
        var p = path.join(projectConfig.getSrcDir(), 'model', model.name + '.java');
        saveFile(p, content);
    }

    //operators
    var models = modelMgr.getOperators();
    var Builder = builderMgr.queryOperatorBuilder();
    var builder = new Builder();
    for(var k in models) {
        var model = models[k];
        var content = builder.parse(model);
        var p = path.join(projectConfig.getSrcDir(), 'operator', model.name + '.java');
        saveFile(p, content);
    }

    if(models.length > 0) {
        var Builder = builderMgr.queryOperatorBuilder('remoteOperatorService');
        var builder = new Builder();
        var content = builder.parse(models);
        var p = path.join(projectConfig.getSrcDir(), 'operator', 'RemoteOperatorService.java');
        saveFile(p, content);
    }

    //viewModels
    var models = modelMgr.getViewModels();
    for(var k in models) {
        var model = models[k];

        var Builder = builderMgr.queryViewModelBuilder(model.type);
        var builder = new Builder();

        var content = builder.parse(model);
        var p = path.join(projectConfig.getSrcDir(), 'viewModel', model.name + '.java');
        saveFile(p, content);
    }

    //viewControllers
    var models = modelMgr.getViewControllers();
    for(var k in models) {
        var model = models[k];

        var VcBuilder = builderMgr.queryViewControllerBuilder(model.type);
        var vcBuilder = new VcBuilder();
        var vcContent = vcBuilder.parse(model);
        if(lotus.util.stringUtil.isNotEmpty(vcContent)) {
            var vcFileName = model.name + '.java';
            var p = path.join(projectConfig.getSrcDir(), 'viewController', vcFileName);
            saveFile(p, vcContent);
        }

        var LayoutBuilder = builderMgr.queryLayoutBuilder();
        var layoutBuilder = new LayoutBuilder();
        var layoutContent = layoutBuilder.parse(model);
        var layoutFileName = lotus.util.nameUtil.vcToXmlFileName(model.name) + '.xml';
        var layoutPath = path.join(projectConfig.getResDir(), 'layout', layoutFileName);
        saveFile(layoutPath, layoutContent);
    }

    //enum
    var models = modelMgr.getEnums();
    for(var k in models) {
        var model = models[k];
        var EnumBuilder = builderMgr.queryEnumBuilder();
        var builder = new EnumBuilder();
        builder.parse(model);
    }

    //manifest
    var ManifestBuilder = require('./builder/project/manifestBuilder');
    var builder = new ManifestBuilder();
    var content = builder.parse();
    var p = path.join(projectConfig.getManifestDir(), 'AndroidManifest.xml');
    saveFile(p, content);

    var ProjectInitializer = require('./builder/project/projectInitializer');
    var projectInitializer = new ProjectInitializer();
    projectInitializer.init();

    var DependencyBuilder = require('./builder/project/dependencyBuilder');
    var builder = new DependencyBuilder();
    builder.parse();
}

var saveFile = function(filePath, content) {
    var dirname = path.dirname(filePath);
    if(!fs.existsSync(dirname)) {
        mkdirp(dirname, function(){
            fs.writeFileSync(filePath, content);
        })
    }
    else {
        fs.writeFileSync(filePath, content);
    }
}

exports.startBuild = startBuild;