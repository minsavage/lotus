/**
 * Created by danney on 16/1/26.
 */
var util = require('util');
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var stringUtil = lotus.util.stringUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var WidgetBuilder = lotus.builderMgr.queryWidgetBuilder();

var ViewControllerCodeBuilder = function() {
    WidgetBuilder.call(this);
}

util.inherits(ViewControllerCodeBuilder, WidgetBuilder);

ViewControllerCodeBuilder.prototype._needParse = function(model, buildConfig) {
    return true;
}

ViewControllerCodeBuilder.prototype._buildMemberVariable = function(model, config) {
    var className = stringUtil.firstCharacterToUppercase(model.name);
    var objName = stringUtil.firstCharacterToLowercase(model.name);
    var variable = codeGenerateUtil.generateMemberVariable(className, objName);
    this._codeRecorder.addMemberVariable(variable);
}

ViewControllerCodeBuilder.prototype._buildOnCreateView = function(model, config) {
    var className = stringUtil.firstCharacterToUppercase(model.name);
    var objName = stringUtil.firstCharacterToLowercase(model.name);

    var ret = mustache.render(tpl.init, {
        objName: objName,
        className: className,
        containerId: model.id
    });

    this._codeRecorder.addOnCreateView(ret);
}

ViewControllerCodeBuilder.prototype._buildOnDestroy = function(model, buildConfig) {
    var objName = stringUtil.firstCharacterToLowercase(model.name);
    this._codeRecorder.addOnDestroy(objName + ' = null;');
}

module.exports = ViewControllerCodeBuilder;