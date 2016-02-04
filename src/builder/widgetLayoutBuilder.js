/**
 * Created by danney on 16/1/23.
 */
var mustache = require('mustache');
var util = require('util');
var widgetMgr = require('../widgetMgr');
var stringUtil = require('../util/stringUtil');
var codeGenerateUtil = require('../util/codeGenerateUtil');
var LayoutGenerateRecorder = require('./layoutGenerateRecorder');

var WidgetLayoutBuilder = function() {
    this._config = null;
    this._model = null;
    this._layoutGenerateRecorder = new LayoutGenerateRecorder();
}

WidgetLayoutBuilder.prototype.parse = function(model, config) {
    this._model = model;
    this._config = config;

    var type = this._buildType();
    var properties = this._buildProperties();
    var content = this._buildContent(model.units);
    var result = codeGenerateUtil.generateXml(type, properties, content);

    this._layoutGenerateRecorder.addResult(result);
    this._layoutGenerateRecorder.addNamespace(config.namespace);
    return this._layoutGenerateRecorder;
}

WidgetLayoutBuilder.prototype._buildType = function() {
    return mustache.render(this._config.typeGenerateRules, {
        value: this._model.type
    })
}

WidgetLayoutBuilder.prototype._buildProperties = function() {
    var result = [];
    for(var key in this._model) {
        if(key == 'type' || key == 'event' || key == 'units') {
            continue;
        }
        var value = this._model[key];
        var p = this._buildProperty(key, value);
        if(stringUtil.isNotEmpty(p)) {
            result.push(p);
        }
    }
    return result;
}

WidgetLayoutBuilder.prototype._buildProperty = function(key, value) {
    if(this._isInReplace(key)) {
        return mustache.render(this._config.propertyGenerateRules.replace[key], {
            key: key,
            value: value
        })
    }

    if(this._isInIgnore(key)) {
        return '';
    }

    if(this._existDefault()) {
        return mustache.render(this._config.propertyGenerateRules.default, {
            key: key,
            value: value
        })
    }

    return '';
}

WidgetLayoutBuilder.prototype._buildContent = function(units) {
    if(util.isNullOrUndefined(units)) {
        return '';
    }

    var result = '';
    for(var k in units) {
        var model = units[k];

        var LayoutBuilder = widgetMgr.queryLayoutBuilder(model.type);
        var layoutBuildConfig = widgetMgr.queryLayoutBuildConfig(model.type);

        var builder = new LayoutBuilder();
        var recorder = builder.parse(model, layoutBuildConfig);
        result += recorder.getResult() + '\n\n';
        this._layoutGenerateRecorder.addNamespaces(recorder.getNamespaces());
    }
    return result.trim();
}

WidgetLayoutBuilder.prototype._isInReplace = function(key) {
    var propertyRules = this._config.propertyGenerateRules;
    if(util.isNullOrUndefined(propertyRules.replace)) {
        return false;
    }

    var rule = propertyRules.replace[key];
    if(util.isNullOrUndefined(rule)) {
        return false;
    }

    return true;
}

WidgetLayoutBuilder.prototype._isInIgnore = function(key) {
    var propertyRules = this._config.propertyGenerateRules;
    if(util.isNullOrUndefined(propertyRules.ignore)) {
        return false;
    }

    var rule = propertyRules.ignore[key];
    if(util.isNullOrUndefined(rule)) {
        return false;
    }

    return true;
}

WidgetLayoutBuilder.prototype._existDefault = function() {
    var propertyRules = this._config.propertyGenerateRules;
    if(util.isNullOrUndefined(propertyRules.default)) {
        return false;
    }
    return true;
}

module.exports = WidgetLayoutBuilder;