/**
 * Created by danney on 16/6/26.
 */
'use strict'
var R = require('ramda');
var translatorMgr = require('./translatorMgr');
var classTranslatorMgr = require('./classTranslatorMgr');
var envExt = require('./envExt');

var translate = function (env, ast, isSetter) {
    let object = ast.object;
    let property = ast.property;

    let objName = null;
    let objType = null;

    if(object.type == 'Identifier') {
        objType = envExt.find(env, object.name);
        objName = object.name;
    }
    else {
        let translate = translatorMgr.find(object.type).translate;
        let ret = translate(env, object);
        objName = ret[0];
        objType = ret[1];
    }

    let classTranslatorMgr = require('./classTranslatorMgr');
    let classTranslator = classTranslatorMgr.find(objType.fullName);
    let ret = translator.translateFiled(objType, objName, property.name, isSetter);
    return ret;
}

exports.translate = translate;