/**
 * Created by danney on 16/1/19.
 */
var util = require('util');
var ImportRecorder = require('./importRecorder');

var CodeRecorder = function(){
    this._memberVariable = '';
    this._onCreate = '';
    this._onCreateView = '';
    this._onDestroy = '';
    this._eventImpl = '';
    this._assignment = '';
    this._dataBinding = {};
    this._importRecorder = new ImportRecorder();
}

CodeRecorder.prototype.addMemberVariable = function(str) {
    this._memberVariable += str;
}

CodeRecorder.prototype.addOnCreate = function(str) {
    this._onCreate += str;
}

CodeRecorder.prototype.addOnCreateView = function(str) {
    this._onCreateView += str;
}

CodeRecorder.prototype.addOnDestroy = function(str) {
    this._onDestroy += str;
}

CodeRecorder.prototype.addEventImpl = function(str) {
    this._eventImpl += str;
}

CodeRecorder.prototype.addAssignment = function(str) {
    this._assignment += str;
}

CodeRecorder.prototype.addImport = function(item) {
    this._importRecorder.add(item);
}

CodeRecorder.prototype.addDataBinding = function(property, str) {
    var oldStr = this._dataBinding[property];
    if(util.isString(oldStr)) {
        this._dataBinding[property] = oldStr + '\r' + str;
    }
    else {
        this._dataBinding[property] = str;
    }
}

CodeRecorder.prototype.getMemberVariable = function() {
    return this._memberVariable;
}

CodeRecorder.prototype.getOnCreate = function() {
    return this._onCreate;
}

CodeRecorder.prototype.getOnCreateView = function() {
    return this._onCreateView;
}

CodeRecorder.prototype.getOnDestroy = function() {
    return this._onDestroy;
}

CodeRecorder.prototype.getEventImpl = function() {
    return this._eventImpl;
}

CodeRecorder.prototype.getAssignment = function() {
    return this._assignment;
}

CodeRecorder.prototype.getDataBinding = function() {
    return this._dataBinding;
}

CodeRecorder.prototype.getImportRecorder = function() {
    return this._importRecorder;
}

CodeRecorder.prototype.toString = function() {
    return this._importRecorder.generate() + '\r' +
        this._memberVariable + '\r' +
        this._memberVariable + '\r' +
        this._onCreate + '\r' +
        this._onCreateView + '\r' +
        this._onDestroy + '\r' +
        this._eventImpl;
}

module.exports = CodeRecorder;