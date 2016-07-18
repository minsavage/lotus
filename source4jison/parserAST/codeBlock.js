/**
 * Created by danney on 16/6/26.
 */
'use strict'
var R = require('ramda');
var mustache = require('mustache');
var translatorMgr = require('./parserMgr');
var strUtil = require('../util/strUtil');

var translateOne = R.curry(function (env, ast) {
    let ret = translatorMgr.findAndTranslate(env, ast)
    let code = ret[0] + ';';
    let type = null;
    
    if(ast.type == 'ReturnStatement') {
        type = ret[1];
    }
    return [code, type];
});

var translate = function (env, codeBlock) {
    let codeList = R.map(translateOne(env), codeBlock);
    let codeListWithReturnType = R.filter(x=>x[1]!=null, codeList);
    
    let returnType = null;
    if(codeListWithReturnType.length > 0) {
        returnType = codeListWithReturnType[0][1]
    }

    let combineCode = R.compose(R.join('\r'), R.map(R.nth(0)));
    let code = combineCode(codeList);
    return [code, returnType];
}

exports.translate = translate;