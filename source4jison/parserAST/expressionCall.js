/**
 * Created by danney on 16/6/26.
 */
'use strict'
var R = require('ramda');
var translatorMgr = require('./parserMgr');
var envExt = require('./envExt');
var memberCallTranslator = require('./expressionMemberCall');

var translate = function (env, ast) {
    var callee = ast.callee;
    if(callee.type == 'Identifier') {
        var handler = findSystemFunction(callee.name);
        if(!R.isNil(handler)) {
            return handler(env, ast);
        }
    }
    else if(callee.type == 'MemberExpression') {
        return memberCallTranslator.translate(env, ast);
    }
    else {
        throw 'can not support callee type for call expression: ' + callee.type;
    }
}

var findSystemFunction = function (name) {
    var map = {
        'showPage': showPage,
        'closePage': closePage,
        'native': native
    }

    return map[name];
}

var showPage = function () {
    
    
}

var closePage = function () {

}

var native = function (env, ast) {
    let code = ast.arguments[0].value;
    let returnType = null;
    if(!R.isNil(ast.arguments[1])) {
        returnType = envExt.find(ast.arguments[1].value);
    }
    return [code, returnType];
}



exports.translate = translate;