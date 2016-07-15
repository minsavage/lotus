'use strict'
var R = require('ramda');
var translatorMgr =require('./translatorMgr');

var mapArg = R.curry(function (env, ast) {
        return translatorMgr.findAndTranslate(env, ast)[0];
    });

var translate = function (env, ast) {
    let ret = translatorMgr.findAndTranslate(env, ast.callee);
    let name = ret[0];
    let type = ret[1];
    let args = R.map(mapArg(env), ast.arguments);
    
    let classTranslatorMgr = require('./classTranslatorMgr');
    let classTranslator = classTranslatorMgr.find(type.fullName);
    ret = classTranslator.translateMethod(env, type, null, 'new', args);
    return ret;
}

exports.translate = translate;