/**
 * Created by danney on 16/1/19.
 */
var util = require('util');
var ImportGenerator = require('../util/importGenerator');

var CodeGenerateRecorder = function(){
    this._memberVariable = '';
    this._onCreate = '';
    this._onCreateView = '';
    this._onDestroy = '';
    this._eventImpl = '';
    this._dataBinding = {};
    this._importGenerator = new ImportGenerator();
}

CodeGenerateRecorder.prototype.addMemberVariable = function(str) {
    this._memberVariable += str;
}

CodeGenerateRecorder.prototype.addOnCreate = function(str) {
    this._onCreate += str;
}

CodeGenerateRecorder.prototype.addOnCreateView = function(str) {
    this._onCreateView += str;
}

CodeGenerateRecorder.prototype.addOnDestroy = function(str) {
    this._onDestroy += str;
}

CodeGenerateRecorder.prototype.addEventImpl = function(str) {
    this._eventImpl += str;
}

CodeGenerateRecorder.prototype.addDataBinding = function(property, str) {
    var oldStr = this._dataBinding[property];
    if(util.isString(oldStr)) {
        this._dataBinding[property] = oldStr + '\r' + str;
    }
    else {
        this._dataBinding[property] = str;
    }
}

//

CodeGenerateRecorder.prototype.getMemberVariable = function() {
    return this._memberVariable;
}

CodeGenerateRecorder.prototype.getOnCreate = function() {
    return this._onCreate;
}

CodeGenerateRecorder.prototype.getOnCreateView = function() {
    return this._onCreateView;
}

CodeGenerateRecorder.prototype.getOnDestroy = function() {
    return this._onDestroy;
}

CodeGenerateRecorder.prototype.getEventImpl = function() {
    return this._eventImpl;
}

CodeGenerateRecorder.prototype.getDataBinding = function() {
    return this._dataBinding;
}

CodeGenerateRecorder.prototype.getImportGenerator = function() {
    return this._importGenerator;
}

module.exports = CodeGenerateRecorder;