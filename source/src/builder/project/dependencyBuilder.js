/**
 * Created by danney on 16/2/5.
 */
var util = require('util');
var path = require('path');
var fsUtil = require('fs-extra');
var lotus = require('../../lotus');
var projectConfig = lotus.projectConfig;
var builderMgr = lotus.builderMgr;
var GradleRecoder = lotus.recorder.GradleRecorder;
var GradleBuilder = require('./gradleBuilder');

var DependencyBuilder = function() {
    this._gradleRecoder = new GradleRecoder();
}

DependencyBuilder.prototype.parse = function() {
    var viewControllerModels = lotus.modelMgr.getViewControllers();
    for(var k in viewControllerModels) {
        var model = viewControllerModels[k];
        this._searchDependency(model.content);
    }

    var gradleBuilder = new GradleBuilder();
    gradleBuilder.parse(this._gradleRecoder);
}

DependencyBuilder.prototype._searchDependency = function(model) {
    var dep = builderMgr.queryWidgetDependency(model.type);
    if(!util.isNullOrUndefined(dep)) {
        if(util.isArray(dep)) {
            for(var k in dep) {
                this._handle(dep[k]);
            }
        }
        else {
            this._handle(dep);
        }
    }
    else {
        if(!util.isNullOrUndefined(model.units)) {
            for(var k in model.units) {
                var child = model.units[k];
                this._searchDependency(child);
            }
        }
    }
}

DependencyBuilder.prototype._handle = function(dep) {
    if(dep.type == 'module') {
        this._handleModuleDependency(dep);
    }
    else if(dep.type == 'library') {
        this._handleLibraryDependency(dep);
    }
    else if(dep.type == 'source') {
        this._handleSourceDependency(dep);
    }
}

DependencyBuilder.prototype._handleModuleDependency = function(dep) {
    var srcDir = dep.src;
    var destDir = path.resolve(projectConfig.getOutputDir(), projectConfig.get('productName'));
    fsUtil.copySync(srcDir, destDir);

    var tpl = 'project(\':{{name}}\')';
    var str = tpl.replace('{{name}}', dep.name);

    this._gradleRecoder.app.dependencies.compile.push(str);
    this._gradleRecoder.setting.include.push('\':' + dep.name + '\'');
}

DependencyBuilder.prototype._handleLibraryDependency = function(dep) {
    this._gradleRecoder.app.dependencies.compile.push('\'' + dep.src + '\'');
}

DependencyBuilder.prototype._handleSourceDependency = function(dep) {
    var srcDir = dep.src;
    var destDir = path.resolve(projectConfig.getSrcDir(), 'widget');
    fsUtil.copySync(srcDir, destDir);
}

module.exports = DependencyBuilder;