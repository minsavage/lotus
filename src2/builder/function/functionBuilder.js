/**
 * Created by danney on 16/2/13.
 */
var path = require('path');
var mustache = require('mustache');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var util =require('util');
var esprima = require('esprima');
var escodegen = require('escodegen');
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var stringUtil = lotus.util.stringUtil;
var variableTypeUtil = lotus.util.variableTypeUtil;

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
        var code = null;
        if(program.type == 'ExpressionStatement') {
            if(program.expression.type == 'CallExpression') {
                code = this.handleCallExpression(program.expression);
            }
            else if(program.expression.type == 'AssignmentExpression'){
                code = this.handleAssignmentExpression(program.expression);
            }
        }

        if(code == null) {
            code = escodegen.generate(program, null);
        }

        this._codeRecorder.addOnCreate(code);
    }

    return this._codeRecorder;
}

FunctionBuilder.prototype.handleCallExpression = function(syntax) {
    if(syntax.callee.type == 'Identifier') {
        if(syntax.callee.name == 'showPage') {
            return this.showPageBuilder(syntax);
        }
        else if(syntax.callee.name == 'closePage') {
            return this.closePageBuilder(syntax);
        }
    }
    return null;
}

FunctionBuilder.prototype.handleAssignmentExpression = function(syntax) {
    var c = build(syntax.right);
    var l = build(syntax.left);
}

FunctionBuilder.prototype.showPageBuilder = function(syntax) {
    var arg0 = syntax.arguments[0];
    var pageName = arg0.value;
    var activityName = lotus.util.nameUtil.pageToActivityName(pageName);

    var code = mustache.render(tpl.showPage.show, {
        pageName: activityName
    });

    this._codeRecorder.getImportRecorder().addPlain('android.content.Intent');
    this._codeRecorder.getImportRecorder().addActivity(activityName);

    return code;
}

FunctionBuilder.prototype.closePageBuilder = function(syntax) {
    var code = 'finish();'
    return code;
}

var build = function(syntax) {
    if(syntax.type == 'MemberExpression') {
        var object = syntax.object;
        var property = syntax.property;

        var result = {};
        if(object.type != 'Identifier') {
            result = build(object);
        }

        var name = ''
        var propertyName = '';
        var content = ''
        var template = ''

        if(object.type == 'Identifier') {
            name = object.name;
            propertyName = object.name + stringUtil.firstCharacterToUppercase(property.name);
            template = '{{content}}';
        }
        else {
            name = result.name;
            propertyName = result.name + stringUtil.firstCharacterToUppercase(property.name);
            template = result.template;
        }

        var type = 'Audio'; //queryType(object.name, property.name);
        content = type + ' ' + propertyName + ' = ' + codeGenerateUtil.generateGetterCall(name, property.name);
        if(variableTypeUtil.canBeNull(type)) {
            content += '\r' + mustache.render(tpl.assignment.ifNotNull, {objName: propertyName})
        }
        else {
            content += '\r[[content]]';
        }

        var newTpl = mustache.render(template, {content: content});
        newTpl = newTpl.replace('[[', '{{').replace(']]', '}}')

        return {
            type: type,
            name: propertyName,
            template: newTpl
        };
    }
    else if(syntax.type == 'CallExpression') {
        if(syntax.callee.type == 'Identifier') {
            return syntax.callee + '();'
        }
        else if(syntax.callee.type == 'MemberExpression') {
            return build(syntax.callee) + '()';
        }
    }
}

module.exports = FunctionBuilder;