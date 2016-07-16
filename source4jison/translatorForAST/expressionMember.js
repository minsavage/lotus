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

    let ret = translatorMgr.findAndTranslate(env, object);
    let objName = ret[0];
    let objType = ret[1];

    let field = objType.findField(property.name);
    let fieldType = objType.loadType(field.type);

    let classTranslatorMgr = require('./classTranslatorMgr');
    let classTranslator = classTranslatorMgr.find(objType.fullName);
    let code = classTranslator.translateFiled(objType, objName, property.name, isSetter);
    
    return [code, fieldType];
}

exports.translate = translate;