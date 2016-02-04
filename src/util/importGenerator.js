/**
 * Created by danney on 16/1/17.
 */
var codeGenerateUtil = require('../util/codeGenerateUtil');
var globalConfig = require('../globalConfig');

var ImportGenerator = function() {
    this._model = {};
    this._viewModel = {};
    this._operator = {};
    this._other = {};
    this._plain = {};
}

ImportGenerator.prototype.addAll = function(importGenerator) {
    var keys = ['_model', '_viewModel', '_operator', '_other', '_plain'];

    for(var i in keys) {
        var k = keys[i];
        var containerRight = importGenerator[k];
        var containerLeft = this[k];

        for(var j in containerRight) {
            containerLeft[j] = containerRight[j]
        }
    }
}

ImportGenerator.prototype.addModel = function(name) {
    this._model[name] = 1;
}

ImportGenerator.prototype.addViewModel = function(name) {
    this._viewModel[name] = 1;
}

ImportGenerator.prototype.addOperator = function(name) {
    this._operator[name] = 1;
}

ImportGenerator.prototype.addOther = function(str) {
    this._other[str] = 1;
}

ImportGenerator.prototype.addPlain = function(str) {
    this._plain[str] = 1;
}

ImportGenerator.prototype.generate = function() {
    var result = '';
    for(var name in this._model) {
        result += codeGenerateUtil.generateImport(globalConfig.packageName, 'model.' + name) + '\r';
    }

    for(var name in this._viewModel) {
        result += codeGenerateUtil.generateImport(globalConfig.packageName, 'viewModel.' + name) + '\r';
    }

    for(var name in this._operator) {
        result += codeGenerateUtil.generateImport(globalConfig.packageName, 'operator.' + name) + '\r';
    }

    for(var str in this._other) {
        result += codeGenerateUtil.generateImport(globalConfig.packageName, str) + '\r';
    }

    for(var str in this._plain) {
        result += 'import ' + str + ';\r';
    }

    return result;
}

module.exports = ImportGenerator;