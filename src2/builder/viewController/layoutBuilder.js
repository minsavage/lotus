/**
 * Created by danney on 16/1/23.
 */
var util = require('util');
var lotus = require('../../lotus');
var builderMgr = lotus.builderMgr;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var LayoutRecorder = lotus.recorder.LayoutRecorder;
var projectConfig = lotus.projectConfig;

var LayoutBuilder = function() {
    this.layoutDataBinding = true;
};

LayoutBuilder.prototype.parse = function(model) {
    if(!util.isNullOrUndefined(model.config)) {
        if(model.config.layoutDataBinding == false) {
            this.layoutDataBinding = false;
            return this._buildWithoutDataBinding(model);
        }
    }
    return this._buildRoot(model);
}

LayoutBuilder.prototype._buildRoot = function(model) {
    var content = this._buildDataBinding(model) + '\n';

    var layoutRecorder = this._buildContent(model.content);
    content += layoutRecorder.getResult();

    var properties = this._buildNamespaces(layoutRecorder.getNamespaces());

    return codeGenerateUtil.generateXml('layout', properties, content, true);
}

LayoutBuilder.prototype._buildDataBinding = function(model) {
    var name = 'name="' + model.viewModel.name + '"';

    var fullType = projectConfig.getPackageName() + '.viewModel.' + model.viewModel.type;
    var type = 'type="' + fullType + '"';

    var properties = [name, type];

    var variable = codeGenerateUtil.generateXml('variable', properties, null);
    return codeGenerateUtil.generateXml('data', null, variable);
}

LayoutBuilder.prototype._buildContent = function(model) {
    var LayoutBuilder = builderMgr.queryWidgetLayoutBuilder(model.type);
    var layoutBuildConfig = builderMgr.queryWidgetLayoutBuildConfig(model.type);

    if(this.layoutDataBinding == false) {
        if(!util.isNullOrUndefined(layoutBuildConfig)) {
            layoutBuildConfig['layoutDataBinding'] = false;
        }
    }
    var ret = null;
    if(!util.isNullOrUndefined(LayoutBuilder)) {
        var builder = new LayoutBuilder();
        ret = builder.parse(model, layoutBuildConfig);
    }
    return ret;
}

LayoutBuilder.prototype._buildNamespaces = function(namespaces) {
    var namespaceArray = [];
    var android = 'xmlns:android="http://schemas.android.com/apk/res/android"';
    namespaceArray.push(android);

    for(var k in namespaces) {
        var str = 'xmlns:' + k + '="http://schemas.android.com/apk/res-auto"';
        namespaceArray.push(str);
    }

    return namespaceArray;
}

LayoutBuilder.prototype._buildWithoutDataBinding = function(modelOld) {
    var model = lotus.util.objectUtil.clone(modelOld);

    delDataBindingField(model.content);

    var layoutRecorder = this._buildContent(model.content);
    var content = layoutRecorder.getResult();

    var properties = this._buildNamespaces(layoutRecorder.getNamespaces());
    var propertiesStr = '';
    for(var k in properties) {
        propertiesStr += properties[k] + ' \r';
    }

    var declare = '<?xml version="1.0" encoding="utf-8"?>';

    var i = content.indexOf(' ');
    content = declare + '\r' + content.substring(0, i) + ' '+ propertiesStr.trim() + content.substring(i);
    return content;
}

var delDataBindingField = function(model) {
    for(var k in model) {
        var v = model[k];
        if(v.indexOf('@{') > -1) {
            delete model[k];
        }
    }

    if(!util.isNullOrUndefined(model.units)) {
        for(var i in model.units) {
            delDataBindingField(model.units[i]);
        }
    }
}

module.exports = LayoutBuilder;