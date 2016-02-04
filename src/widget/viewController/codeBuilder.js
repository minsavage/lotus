/**
 * Created by danney on 16/1/26.
 */
var mustache = require('mustache');
var tpl = require('../../template')(__dirname + '/template');
var util = require('util');
var stringUtil = require('../../util/stringUtil');
var codeGenerateUtil = require('../../util/codeGenerateUtil');
var WidgetCodeBuilder = require('../../builder/widgetCodeBuilder');

var ViewControllerCodeBuilder = function() {
    WidgetCodeBuilder.call(this);
}

util.inherits(ViewControllerCodeBuilder, WidgetCodeBuilder);

ViewControllerCodeBuilder.prototype._needParse = function(model, buildConfig) {
    return true;
}

ViewControllerCodeBuilder.prototype._buildMemberVariable = function(model, config) {
    var className = stringUtil.firstCharacterToUppercase(model.name);
    var objName = stringUtil.firstCharacterToLowercase(model.name);
    var variable = codeGenerateUtil.generateMemberVariable(className, objName);
    this._codeGenerateRecorder.addMemberVariable(variable);
}

ViewControllerCodeBuilder.prototype._buildOnCreateView = function(model, config) {
    var className = stringUtil.firstCharacterToUppercase(model.name);
    var objName = stringUtil.firstCharacterToLowercase(model.name);

    var ret = mustache.render(tpl.init, {
        objName: objName,
        className: className,
        containerId: model.id
    });

    this._codeGenerateRecorder.addOnCreateView(ret);
}

ViewControllerCodeBuilder.prototype._buildOnDestroy = function(model, buildConfig) {
    var objName = stringUtil.firstCharacterToLowercase(model.name);
    this._codeGenerateRecorder.addOnDestroy(objName + ' = null;');
}

module.exports = ViewControllerCodeBuilder;