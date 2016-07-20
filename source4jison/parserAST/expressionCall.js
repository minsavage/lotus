/**
 * Created by danney on 16/6/26.
 */
'use strict'
var R = require('ramda');
let mustache = require('mustache');
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
        'createViewModel': createViewModel,
        'native': native
    }

    return map[name];
}

var showPage = function (env, ast) {
    let code = 'showPage()';
    return [code, 'void'];
}

var closePage = function (env, ast) {
    let code = 'closePage()';
    return [code, 'void'];
}

var createViewModel = function (env, ast) {
    // 'rsVM = (RevealSquareViewModel) ViewModelMgr.createViewModel(RevealSquareViewModel.class, getContext());'
    let tpl = '{{name}} = ({{type}})ViewModelMgr.createViewModel({{type}}.class, getContext())'
    let code = mustache.render(tpl, {
        type: ast.arguments[0].name, 
        name: ast.arguments[1].name}
    )
    return [code, null];
}

var native = function (env, ast) {
    let code = ast.arguments[0].value;
    let returnType = null;
    if(!R.isNil(ast.arguments[1])) {
        let ret = ast.arguments[1].value;
        returnType = envExt.find(env, ret);
    }
    return [code, returnType];
}



exports.translate = translate;