/**
 * Created by danney on 16/2/13.
 */
var path = require('path');
var mustache = require('mustache');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var util =require('util');
var esprima = require('esprima');
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var stringUtil = lotus.util.stringUtil;
var CodeTranslator = require('./codeTranslator');

var CodeRecorder = lotus.recorder.CodeRecorder;

var FunctionBuilder = function() {
    this._codeRecorder = new CodeRecorder();
}

FunctionBuilder.prototype.parse = function(f) {
    var code = f;
    if(util.isFunction(f)) {
        code = f.toString();
        code = code.substring(13, code.length -1);
    }

    var syntax = esprima.parse(code);
    if(!util.isArray(syntax.body)) {
        return null;
    }

    var programs = syntax.body;

    for(var k in programs) {
        var program = programs[k];

        var codeTranslator = new CodeTranslator();
        var result = codeTranslator.translate(program);

        this._codeRecorder.addOnCreate(result.code + '\r');
        this._codeRecorder.getImportRecorder().addAll(result.import);
    }

    return this._codeRecorder;
}

module.exports = FunctionBuilder;