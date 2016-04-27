/**
 * Created by danney on 16/2/19.
 */
var path = require('path');
var mustache = require('mustache');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var util =require('util');
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var stringUtil = lotus.util.stringUtil;
var ImportRecorder = lotus.recorder.ImportRecorder;

var CodeTranslator = function() {
    this.map = {
        ExpressionStatement: this.handleExpressionStatement,
        CallExpression: this.handleCallExpression,
        AssignmentExpression: this.handleAssignmentExpression,
        MemberExpression: this.handleMemberExpression,
        IfStatement: this.handleIfStatement,
        BlockStatement: this.handleBlockStatement,
        Literal: this.handleLiteral,
        Identifier: this.handleIdentifier
    };

    this._importRecorder = new ImportRecorder();
}

CodeTranslator.prototype.translate = function(syntax) {
    var code = this.parse(syntax);
    return {
        code: code,
        import: this._importRecorder
    }
}

CodeTranslator.prototype.parse = function(syntax) {
    var handle = this.find(syntax.type);
    if(util.isFunction(handle)) {
        return handle.call(this, syntax);
    }
    else {
        return '';
    }
}

CodeTranslator.prototype.find = function(type) {
    return this.map[type];
}

CodeTranslator.prototype.handleExpressionStatement = function(syntax) {
    return this.parse(syntax.expression);
}

CodeTranslator.prototype.handleCallExpression = function(syntax) {
    var functionName = '';
    var callee = syntax.callee;
    if(callee.type == 'Identifier') {
        var code = this.handleSystemCallExpression(syntax);
        if(stringUtil.isNotEmpty(code)) {
            return code;
        }

        functionName = callee.name;
    }
    else {
        functionName = this.parse(callee.object) + '.' + callee.property.name
    }

    var arguments = syntax.arguments;
    var argStr = ''
    for(var k in arguments) {
        var argument = arguments[k];
        argStr += this.parse(argument) + ', ';
    }
    argStr = argStr.trim();
    if(stringUtil.isNotEmpty(argStr)) {
        argStr = argStr.substr(0, argStr.length -1);
    }

    var tpl = '{{func}}({{args}});'
    return mustache.render(tpl, {
        func: functionName,
        args: argStr
    });
}

CodeTranslator.prototype.handleAssignmentExpression = function(syntax) {
    var right = this.parse(syntax.right);
    right = stringUtil.withoutSuffix(right, ';');


    var obj = null;
    var property = null;
    var left = syntax.left;
    if(left.type == "Identifier") {
        property = left.name;
    }
    else {
        obj = this.parse(left.object);
        property = this.parse(left.property);
    }

    var code = codeGenerateUtil.generateSetterCall(obj, property, right);
    return code;

    //var obj = "Identifier"
    //var left = this.handleMemberExpression(syntax.left, true, right) + ';';
    //return left;
}

CodeTranslator.prototype.handleMemberExpression = function(syntax, isSetter, setValue) {
    var object = syntax.object;
    var property = syntax.property;

    var objName = '';
    if(object.type != 'Identifier') {
        objName = this.handleMemberExpression(object);
    }
    else {
        objName = object.name;
    }

    var code = '';
    if(isSetter == true) {
        code = codeGenerateUtil.generateSetterCall(objName, property.name, setValue);
    }
    else {
        code = codeGenerateUtil.generateGetterCall(objName, property.name);
    }

    return stringUtil.withoutSuffix(code, ';');
}


CodeTranslator.prototype.handleIfStatement = function(syntax) {
    var left = this.parse(syntax.test.left);
    var right = this.parse(syntax.test.right);

    var consequent = this.parse(syntax.consequent);
    var alternate = '';

    if(!util.isNullOrUndefined(syntax.alternate)) {
        alternate = this.parse(syntax.alternate);
    }

    var tpl = 'if ({{left}} {{operator}} {{right}}) {\r {{consequent}}\r}'
    var code = mustache.render(tpl, {
        left: left,
        right: right,
        operator: syntax.test.operator,
        consequent: consequent
    });

    if(stringUtil.isNotEmpty(alternate)) {
        code += '\relse {\r' + alternate + '\r}'
    }

    return code;
}

CodeTranslator.prototype.handleBlockStatement = function(syntax) {
    var body = syntax.body;
    var code = '';
    for(var k in body) {
        var action = body[k];
        code += this.parse(action);
    }
    return code;
}

CodeTranslator.prototype.handleLiteral = function(syntax) {
    return syntax.raw;
}

CodeTranslator.prototype.handleIdentifier = function(syntax) {
    return syntax.name;
}

CodeTranslator.prototype.handleSystemCallExpression = function(syntax) {
    if(syntax.callee.name == 'showPage') {
        return this.showPageBuilder(syntax);
    }
    else if(syntax.callee.name == 'closePage') {
        return this.closePageBuilder(syntax);
    }
    else if(syntax.callee.name == 'native') {
        return this.nativeBuilder(syntax);
    }
    else {
        return '';
    }
}

CodeTranslator.prototype.showPageBuilder = function(syntax) {
    var arg0 = syntax.arguments[0];
    var pageName = arg0.value;
    var activityName = lotus.util.nameUtil.pageToActivityName(pageName);

    var code = mustache.render(tpl.showPage.show, {
        pageName: activityName
    });

    this._importRecorder.add('android.content.Intent');
    this._importRecorder.add('$.activity.'+activityName);

    return code;
}

CodeTranslator.prototype.closePageBuilder = function(syntax) {
    var code = 'finish();'
    return code;
}

CodeTranslator.prototype.nativeBuilder = function(syntax) {
    var arg0 = syntax.arguments[0];
    var native = arg0.value;
    return native;
}

module.exports = CodeTranslator;