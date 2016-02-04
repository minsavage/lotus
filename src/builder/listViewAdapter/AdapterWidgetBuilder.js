/**
 * Created by danney on 16/2/1.
 */
var util = require('util');
var mustache = require('mustache');
var tpl = require('../../template')('./template');
var codeGenerateUtil = require('../../util/codeGenerateUtil');
var WidgetCodeBuilder = require('../widgetCodeBuilder');

var AdapterWidgetBuilder = function() {
    WidgetCodeBuilder.call(this);
}

util.inherits(AdapterWidgetBuilder, WidgetCodeBuilder);

AdapterWidgetBuilder.prototype.parse = function(model, buildConfig) {
    AdapterWidgetBuilder.super_.prototype.parse.call(this, model, buildConfig);

    this._buildInitViewHolder(model);
    this._buildViewHolderAssignment(model);

    return this._codeGenerateRecorder
}

AdapterWidgetBuilder.prototype._needParse = function(model, buildConfig) {
    if(util.isNullOrUndefined(buildConfig)) {
        return false;
    }

    for(var k in model) {
        var v = model[k];
        if(v.indexOf('@{') > -1) {
            return true;
        }
    }

    if(util.isNullOrUndefined(model.event)) {
        return false;
    }
    else {
        return true;
    }
}

AdapterWidgetBuilder.prototype._buildMemberVariable = function(model, buildConfig) {
    var declare = model.type + ' ' + model.id + ';';
    this._codeGenerateRecorder.addMemberVariable(declare);
}

AdapterWidgetBuilder.prototype._buildOnCreateView = function(model, buildConfig) {
    var objName = 'viewHolder.' + model.id;
    var onCreateView = codeGenerateUtil.generateFindViewById(model.type, objName, 'view', model.id) + '\r';
    this._codeGenerateRecorder.addOnCreateView(onCreateView);
}

AdapterWidgetBuilder.prototype._buildInitViewHolder = function(model) {
    var str = mustache.render(tpl.listViewAdapter.widgetInitForViewHolder, {id: model.id})
    this._codeGenerateRecorder.addOnCreateView(str);
}

AdapterWidgetBuilder.prototype._buildViewHolderAssignment = function(model) {
    for(var k in model) {
        var v = model[k];
        if(v.indexOf('@{') == -1) {
            continue;
        }
        v = v.substr(2, v.length-3);
        var array = v.split('.');
        var obj = array[0];
        var property = array[1];
        var getter = codeGenerateUtil.generateGetterCall(obj, property);
        getter = getter.substr(0, getter.length-1);

        var objName = 'viewHolder.' + model.id
        var code = codeGenerateUtil.generateSetterCall(objName, k, getter);

        //借用一下这个返回容器
        this._codeGenerateRecorder.addOnCreate(code);
    }
}

module.exports = AdapterWidgetBuilder;