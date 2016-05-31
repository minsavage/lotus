/**
 * Created by danney on 16/2/13.
 */
'use strict';
var util = require('util');
var lotus = require('../../../lotus')
var mustache = require('mustache');
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var WidgetBuilder = lotus.builderMgr.queryWidgetBuilder();
var dataBindingUtil = lotus.util.dataBindingUtil;
var esprima = require('esprima');
var CodeTranslator = require('../../../builder/function/CodeTranslator');

var util = require('util');
var lotus = require('../../../lotus')
var path = require('path');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var mustache = require('mustache');
var codeGenerateUtil = lotus.util.codeGenerateUtil;

var dataBindingUtil = lotus.util.dataBindingUtil;
var esprima = require('esprima');
var CodeTranslator = require('../../../builder/function/CodeTranslator');

var WidgetBuilder = lotus.builderMgr.queryWidgetBuilder();

class XImageViewBuilder extends WidgetBuilder {
    parse(model, buildConfig) {
        super.parse(model, buildConfig);
    }
}



XImageViewBuilder.prototype.parse = function() {
    XImageViewBuilder.super_.prototype.parse.call(this, model, buildConfig);

    if(this._isAdapterModel != true) {
        this._buildPropertyForURI(model);
    }

    return this._codeRecorder;
}

XImageViewBuilder.prototype._needParse = function(model, buildConfig) {
    if(!util.isNullOrUndefined(model.uri)) {
        return true;
    }

    return XImageViewBuilder.super_.prototype._needParse.call(this, model, buildConfig);
}

XImageViewBuilder.prototype._buildPropertyForURI = function(model) {
    var uri = model['uri'];
    if(util.isNullOrUndefined(uri)) {
        return;
    }

    if(!dataBindingUtil.checkIsDataBinding(uri)) {
        throw 'SimpleDraweeViewCode: uri is not data binding value, uri = ' + uri;
    }

    uri = dataBindingUtil.getPlainValue(uri);

    var syntax = esprima.parse(uri);
    var codeTranslator = new CodeTranslator();
    var right = codeTranslator.translate(syntax.body[0]).code;

    var array = uri.split('.');
    var vmProperty = array[1];

    var tpl = '{{obj}}.setImageURI(Uri.parse({{value}}));';
    var code = mustache.render(tpl, {
        obj: model.id,
        value: right
    })

    this._codeRecorder.addDataBinding(vmProperty, code);
}

XImageViewBuilder.prototype._buildAssignment = function(key, value, model) {
    if(key != 'uri') {
        XImageViewBuilder.super_.prototype._buildAssignment.call(this, key, value, model);
        return;
    }

    var array = value.split('.');
    var obj = array[0];
    var property = array[1];

    var getter = codeGenerateUtil.generateGetterCall(obj, property);
    getter = getter.substr(0, getter.length-1);

    var objName = 'viewHolder.' + model.id;



    var strTpl = '{{obj}}.setImageURI(Uri.parse({{value}}));'

    var code = mustache.render(strTpl, {
        obj: objName,
        value: getter
    })

    this._codeRecorder.addAssignment(code);
    this._codeRecorder.getImportRecorder().addPlain('android.net.Uri');
}

module.exports = XImageViewBuilder;