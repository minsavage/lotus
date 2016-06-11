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

FunctionBuilder.prototype.parse = function(f, env) {
    if(!util.isFunction(f)) {
        throw 'FunctionBuilder need a function';
    }

    var code = 'var x = ' + f.toString();

    var syntax = esprima.parse(code);
    if(!util.isArray(syntax.body)) {
        return null;
    }

    var funcObject = syntax.body[0].declarations[0].init;

    var parameters = getParameters(funcObject.params);
    var code = '';
    var importRecorder = new lotus.recorder.ImportRecorder();

    var programs = funcObject.body.body;

    for(var k in programs) {
        var program = programs[k];

        var codeTranslator = new CodeTranslator();
        var result = codeTranslator.translate(program, env);

        code += result.code + '\r';
        importRecorder.add(result.import);
    }

    return {
        parameters: parameters,
        import: importRecorder,
        code: code
    }
}

var getParameters = function(params) {
    var parameters = [];
    for(var k in params) {
        var para = params[k];
        parameters.push(para.name);
    }
    return parameters;
}

module.exports = FunctionBuilder;