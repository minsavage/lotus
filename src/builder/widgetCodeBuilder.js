/**
 * Created by danney on 16/1/19.
 */
var util = require('util');
var mustache = require('mustache');
var tpl = require('../template')('./template');
var globalConfig = require('../globalConfig');
var codeGenerateUtil = require('../util/codeGenerateUtil');
var CodeGenerateRecorder = require('./codeGenerateRecorder');

var WidgetCodeBuilder = function() {
    this._codeGenerateRecorder = new CodeGenerateRecorder();
}

WidgetCodeBuilder.prototype.parse = function(model, buildConfig) {
    if(!this._needParse(model, buildConfig)) {
        return;
    }

    this._buildMemberVariable(model, buildConfig);
    this._buildOnCreate(model, buildConfig);
    this._buildOnCreateView(model, buildConfig);
    this._buildOnDestroy(model, buildConfig);
    this._buildEvent(model, buildConfig);
    this._buildImport(model, buildConfig);

    return this._codeGenerateRecorder;
}

WidgetCodeBuilder.prototype._needParse = function(model, buildConfig) {
    if(util.isNullOrUndefined(buildConfig) || util.isNullOrUndefined(model.event)) {
        return false;
    }
    else {
        return true;
    }
}

WidgetCodeBuilder.prototype._buildMemberVariable = function(model, buildConfig) {
    var variable = codeGenerateUtil.generateMemberVariable(model.type, model.id);
    this._codeGenerateRecorder.addMemberVariable(variable);
}

WidgetCodeBuilder.prototype._buildOnCreate = function(model, buildConfig) {
    if(!util.isNullOrUndefined(buildConfig.onCreate)) {
        this._codeGenerateRecorder.addOnCreate(buildConfig.onCreate);
    }
}

WidgetCodeBuilder.prototype._buildOnCreateView = function(model, buildConfig) {
    var onCreateView = codeGenerateUtil.generateFindViewById(model.type, model.id, 'view', model.id) + '\r';
    this._codeGenerateRecorder.addOnCreateView(onCreateView);
}

WidgetCodeBuilder.prototype._buildOnDestroy = function(model, buildConfig) {
    this._codeGenerateRecorder.addOnDestroy(model.id + ' = null;');
}

WidgetCodeBuilder.prototype._buildEvent = function(model, buildConfig) {
    if(util.isNullOrUndefined(model.event) ||
        util.isNullOrUndefined(buildConfig.event)) {
        return;
    }

    var events = model.event;
    for(var name in events) {
        var action = events[name];
        var config = buildConfig.event[name];
        if(util.isNullOrUndefined(config)) {
            continue;
        }

        var listenerName = model.id + config.name;

        var eventInit = mustache.render(config.init, {
            objName: model.id,
            listenerName:listenerName
        });

        var eventImpl = mustache.render(config.impl, {
            listenerName:listenerName,
            content: ''
        });

        this._codeGenerateRecorder.addOnCreateView(eventInit);
        this._codeGenerateRecorder.addEventImpl(eventImpl);
    }
}

WidgetCodeBuilder.prototype._buildImport = function(model, buildConfig) {
    if(!util.isNullOrUndefined(buildConfig.import)) {
        var importGenerator = this._codeGenerateRecorder.getImportGenerator();
        for(var k in buildConfig.import) {
            importGenerator.addPlain(buildConfig.import[k]);
        }
    }
}


module.exports = WidgetCodeBuilder;