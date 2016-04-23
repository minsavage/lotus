/**
 * Created by danney on 16/2/2.
 */
var util = require('util');
var mustache = require('mustache');
var tpl = require('../../../template')(__dirname + '/template');
var CodeGenerateRecorder = require('../../../builder/codeGenerateRecorder');
var codeGenerateUtil = require('../../../util/codeGenerateUtil');
//var WidgetCodeBuilder = require('../../../builder/widgetCodeBuilder');

var CodeBuilder = function() {
    this._codeGenerateRecorder = new CodeGenerateRecorder();
}

CodeBuilder.prototype.parse = function(model, buildConfig) {
    this._buildMemberVariable(model);
    this._buildOnCreateView(model);
    this._buildOnDestroy(model);
    return this._codeGenerateRecorder
}

CodeBuilder.prototype._buildMemberVariable = function(model) {
    var variable = codeGenerateUtil.generateMemberVariable('ViewPager', model.id);
    this._codeGenerateRecorder.addMemberVariable(variable);
}

CodeBuilder.prototype._buildOnCreateView = function(model, buildConfig) {
    var onCreateView  = mustache.render(tpl.init, {objName: model.id})
    this._codeGenerateRecorder.addOnCreateView(onCreateView);
}

CodeBuilder.prototype._buildOnDestroy = function(model) {
    this._codeGenerateRecorder.addOnDestroy(model.id + ' = null;');
}

module.exports = CodeBuilder;