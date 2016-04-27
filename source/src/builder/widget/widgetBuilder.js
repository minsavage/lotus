/**
 * Created by danney on 16/1/19.
 */
var util = require('util');
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var projectConfig = lotus.projectConfig;
var CodeRecorder = lotus.recorder.CodeRecorder;
var FunctionBuilder = require('../function/functionBuilder');

var WidgetCodeBuilder = function() {
    this._codeRecorder = new CodeRecorder();
    this._isAdapterModel = false;
    this.modelType = null;
}

WidgetCodeBuilder.prototype.parse = function(model, buildConfig) {
    if(!this._needParse(model, buildConfig)) {
        return;
    }

    if(!util.isNullOrUndefined(buildConfig.name)) {
        this.modelType = buildConfig.name;
    }
    else {
        this.modelType = model.type;
    }

    this._buildMemberVariable(model, buildConfig);
    this._buildOnCreate(model, buildConfig);
    this._buildOnCreateView(model, buildConfig);
    this._buildOnDestroy(model, buildConfig);
    this._buildEvent(model, buildConfig);
    this._buildImport(model, buildConfig);

    if(this._isAdapterModel == true) {
        this._buildAssignments(model);
    }

    return this._codeRecorder;
}

WidgetCodeBuilder.prototype.setBuildAdapterMode = function() {
    this._isAdapterModel = true;
}

WidgetCodeBuilder.prototype._needParse = function(model, buildConfig) {
    if(this._isAdapterModel == true){
        for(var k in model) {
            var v = model[k];
            if(util.isString(v)) {
                if(v.indexOf('@{') > -1) {
                    return true;
                }
            }
        }
    }

    if(util.isNullOrUndefined(buildConfig) || util.isNullOrUndefined(model.event)) {
        return false;
    }
    else {
        return true;
    }
}

WidgetCodeBuilder.prototype._buildMemberVariable = function(model, buildConfig) {
    var code = '';
    if(this._isAdapterModel == false) {
        code = codeGenerateUtil.generateMemberVariable(this.modelType, model.id);
    }
    else {
        code = codeGenerateUtil.generateVariableDeclare(this.modelType, model.id);
    }
    this._codeRecorder.addMemberVariable(code);
}

WidgetCodeBuilder.prototype._buildOnCreate = function(model, buildConfig) {
    if(!util.isNullOrUndefined(buildConfig) && !util.isNullOrUndefined(buildConfig.onCreate)) {
        this._codeRecorder.addOnCreate(buildConfig.onCreate);
    }
}

WidgetCodeBuilder.prototype._buildOnCreateView = function(model, buildConfig) {
    var name = ''
    if(this._isAdapterModel == false) {
        name = model.id;
    }
    else {
        name = 'viewHolder.' + model.id;
    }

    var code = codeGenerateUtil.generateFindViewById(this.modelType, name, 'view', model.id) + '\r';
    this._codeRecorder.addOnCreateView(code);
}

WidgetCodeBuilder.prototype._buildOnDestroy = function(model, buildConfig) {
    this._codeRecorder.addOnDestroy(model.id + ' = null;');
}

WidgetCodeBuilder.prototype._buildEvent = function(model, buildConfig) {
    if(util.isNullOrUndefined(model.event) ||
        util.isNullOrUndefined(buildConfig.event)) {
    }

    var events = model.event;
    for(var name in events) {
        var action = events[name];
        var config = buildConfig.event[name];
        if(util.isNullOrUndefined(config)) {
            continue;
        }

        var functionBuilder = new FunctionBuilder();

        var codeRecorder = functionBuilder.parse(action);
        var content = codeRecorder.code;
        this._codeRecorder.getImportRecorder().add(codeRecorder.import);

        var listenerName = model.id + config.name;

        var objName = model.id;
        if(this._isAdapterModel == true) {
            objName = 'viewHolder.' + model.id;
        }

        var eventInit = mustache.render(config.init, {
            objName: objName,
            listenerName:listenerName
        });

        var eventImpl = mustache.render(config.impl, {
            listenerName:listenerName,
            content: content
        });

        this._codeRecorder.addOnCreateView(eventInit);
        this._codeRecorder.addEventImpl(eventImpl);
    }
}

WidgetCodeBuilder.prototype._buildImport = function(model, buildConfig) {
    if(!util.isNullOrUndefined(buildConfig) && !util.isNullOrUndefined(buildConfig.import)) {
        var importGenerator = this._codeRecorder.getImportRecorder();
        importGenerator.add(buildConfig.import)
    }
}

WidgetCodeBuilder.prototype._buildAssignments = function(model) {
    for(var k in model) {
        var v = model[k];
        if(!util.isString(v)) {
            continue;
        }
        if(v.indexOf('@{') == -1) {
            continue;
        }
        v = v.substr(2, v.length-3);

        this._buildAssignment(k, v, model);
    }
}

WidgetCodeBuilder.prototype._buildAssignment = function(key, value, model) {
    var array = value.split('.');
    var obj = array[0];
    var property = array[1];

    var getter = codeGenerateUtil.generateGetterCall(obj, property);
    getter = getter.substr(0, getter.length-1);

    var objName = 'viewHolder.' + model.id
    var code = codeGenerateUtil.generateSetterCall(objName, key, getter);

    this._codeRecorder.addAssignment(code);
}


module.exports = WidgetCodeBuilder;