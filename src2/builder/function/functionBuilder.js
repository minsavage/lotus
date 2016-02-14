/**
 * Created by danney on 16/2/13.
 */
var path = require('path');
var mustache = require('mustache');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var util =require('util');
var esprima = require('esprima');
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
        if(program.type == 'ExpressionStatement') {
            if(program.expression.type == 'CallExpression') {
                this.handleCallExpression(program.expression);
            }
        }
    }

    return this._codeRecorder;
}

FunctionBuilder.prototype.handleCallExpression = function(syntax) {
    if(syntax.callee.type == 'Identifier') {
        if(syntax.callee.name == 'showPage') {
            return this.showPageBuilder(syntax);
        }
    }
}

FunctionBuilder.prototype.showPageBuilder = function(syntax) {
    var arg0 = syntax.arguments[0];
    var pageName = arg0.value;
    var activityName = lotus.util.nameUtil.pageToActivityName(pageName);

    var show = mustache.render(tpl.showPage.show, {
        pageName: activityName
    });

    this._codeRecorder.addOnCreate(show);
    this._codeRecorder.getImportRecorder().addPlain('android.content.Intent');
    this._codeRecorder.getImportRecorder().addActivity(activityName);
}

module.exports = FunctionBuilder;