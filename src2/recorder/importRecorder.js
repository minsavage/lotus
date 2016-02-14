/**
 * Created by danney on 16/1/17.
 */
var codeGenerateUtil = require('../util/codeGenerateUtil');
var projectConfig = require('../projectConfig');

var ImportRecorder = function() {
    this._model = {};
    this._viewModel = {};
    this._operator = {};
    this._other = {};
    this._plain = {};
    this._activity = {};
}

ImportRecorder.prototype.addAll = function(importGenerator) {
    var keys = ['_model', '_viewModel', '_operator', '_other', '_plain', '_activity'];

    for(var i in keys) {
        var k = keys[i];
        var containerRight = importGenerator[k];
        var containerLeft = this[k];

        for(var j in containerRight) {
            containerLeft[j] = containerRight[j]
        }
    }
}

ImportRecorder.prototype.addModel = function(name) {
    this._model[name] = 1;
}

ImportRecorder.prototype.addViewModel = function(name) {
    this._viewModel[name] = 1;
}

ImportRecorder.prototype.addOperator = function(name) {
    this._operator[name] = 1;
}

ImportRecorder.prototype.addActivity = function(str) {
    this._activity[str] = 1;
}

ImportRecorder.prototype.addOther = function(str) {
    this._other[str] = 1;
}

ImportRecorder.prototype.addPlain = function(str) {
    this._plain[str] = 1;
}

ImportRecorder.prototype.generate = function() {
    var result = '';
    for(var name in this._model) {
        result += codeGenerateUtil.generateImport(projectConfig.getPackageName(), 'model.' + name) + '\r';
    }

    for(var name in this._viewModel) {
        result += codeGenerateUtil.generateImport(projectConfig.getPackageName(), 'viewModel.' + name) + '\r';
    }

    for(var name in this._operator) {
        result += codeGenerateUtil.generateImport(projectConfig.getPackageName(), 'operator.' + name) + '\r';
    }

    for(var name in this._activity) {
        result += codeGenerateUtil.generateImport(projectConfig.getPackageName(), 'activity.' + name) + '\r';
    }

    for(var str in this._other) {
        result += codeGenerateUtil.generateImport(projectConfig.getPackageName(), str) + '\r';
    }

    for(var str in this._plain) {
        result += 'import ' + str + ';\r';
    }

    return result;
}

module.exports = ImportRecorder;