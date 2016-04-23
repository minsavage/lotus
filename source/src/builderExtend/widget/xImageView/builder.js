/**
 * Created by danney on 16/1/19.
 */
var util = require('util');
var mustache = require('mustache');
var tpl = require('./template');
var globalConfig = require('../../globalConfig');
var stringUtil = require('../../util/stringUtil');
var codeGenerateUtil = require('../../util/codeGenerateUtil');
var CodeGenerateRecorder = require('../../builder/codeGenerateRecorder');
var dataBindingUtil = require('../../util/dataBindingUtil');


var SimpleDraweeViewCodeBuilder = function() {
    this._codeGenerateRecorder = new CodeGenerateRecorder();

    this._model = null;
}

SimpleDraweeViewCodeBuilder.prototype.parse = function(model) {
    this._model = model;

    var variable = codeGenerateUtil.generateMemberVariable(model.type, model.id);
    this._codeGenerateRecorder.addMemberVariable(variable);

    var onCreate = 'Fresco.initialize(getContext());'
    this._codeGenerateRecorder.addOnCreate(onCreate);

    var onCreateView = codeGenerateUtil.generateFindViewById(model.type, model.id, 'view', model.id);
    this._codeGenerateRecorder.addOnCreateView(onCreateView);

    this._buildPropertyForURI(model);
    this._buildEvent(model);

    var importGenerator = this._codeGenerateRecorder.getImportGenerator();
    importGenerator.addPlain('com.facebook.drawee.backends.pipeline.Fresco');
    importGenerator.addPlain('com.facebook.drawee.view.SimpleDraweeView');

    return this._codeGenerateRecorder;
}

SimpleDraweeViewCodeBuilder.prototype._buildPropertyForURI = function(model) {
    var uri = model['uri'];
    if(util.isNullOrUndefined(uri)) {
        return;
    }

    if(!dataBindingUtil.checkIsDataBinding(uri)) {
        throw 'SimpleDraweeViewCode: uri is not data binding value, uri = ' + uri;
    }

    uri = dataBindingUtil.getPlainValue(uri);

    var array = uri.split('.');
    if(array.length != 2) {
        throw 'SimpleDraweeViewCode: uri value error, uri = ' + uri;
    }

    var vmName = array[0];
    var vmProperty = array[1];

    var vmCall = codeGenerateUtil.generateGetterCall(vmName, vmProperty);
    var code = model.id + '.setImageURI(Uri.parse(' + vmCall + '));';

    this._codeGenerateRecorder.addDataBinding(vmProperty, code);
}

SimpleDraweeViewCodeBuilder.prototype._buildEvent = function(model) {
    if(util.isNullOrUndefined(model.event)) {
        return;
    }

    var onClick = this._buildEventOnClick(model);
    this._codeGenerateRecorder.addEventImpl(onClick);
}

SimpleDraweeViewCodeBuilder.prototype._buildEventOnClick = function(model) {
    if(util.isNullOrUndefined(model.event.onClick)) {
        return;
    }

    return mustache.render(tpl.onClick, {
        name: getOnClickListenerObjName(this._model.id),
        content: ''
    });
}

var getOnClickListenerObjName = function(viewId) {
    return viewId + 'OnClickListener'
}

module.exports = SimpleDraweeViewCodeBuilder;