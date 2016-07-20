'use strict'
var R = require('ramda');
var translatorMgr =require('./parserMgr');

var mapArg = R.curry(function (env, ast) {
        return translatorMgr.findAndTranslate(env, ast)[0];
    });

var translate = function (env, ast) {
    let ret = translatorMgr.findAndTranslate(env, ast.callee);
    let name = ret[0];
    let type = ret[1];
    let args = R.map(mapArg(env), ast.arguments);
    
    let classTranslatorMgr = require('../translator/translatorMgr');
    let classTranslator = classTranslatorMgr.find(type.fullName);
    ret = classTranslator.translateMethod(env, type, null, 'new', args);
    if(ret instanceof Array) {
        //these was return type in the ret
        //because some translator will change the real type , ie: generics
        return ret;
    }
    else {
        return [ret, type];
    }
}

exports.translate = translate;