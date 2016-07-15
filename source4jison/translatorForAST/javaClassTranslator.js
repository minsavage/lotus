/**
 * Created by danney on 16/7/8.
 */
'use strict'
var R = require('ramda');
var mustache = require('mustache');
var findTypeInEnv = require('./envExt').find;
var createEnv = require('./envExt').createEnv;
var codeGenUtil = require('../util/codeGenUtil');

var translateClassName = function (objClass) {
    let name = objClass.name;
    switch (name) {
        case 'int':
            return 'Integer';
        case 'string':
            return 'String';
        case 'bool':
            return 'boolean';
        case 'object':
            return 'Object';
    
        default:
            return null;
    }
}

var translateFiled = function (objClass, objName, fieldName, isSetter) {
    var env = createEnv(objClass);
    var fieldType = findTypeInEnv(env, fieldName);
    if(fieldType.isProperty == true) {
        return codeGenUtil.genGetterCall(objName, fieldName)
    }
    else {
        return objName + '.' + fieldName;
    }
}

var translateMethod = function (objClass, objName, methodName, args) {
    var argsStr = R.join(', ', args);
    var tpl = '{{name}}.{{method}}({{args}})'
    return mustache.render(tpl, {
        name: objName,
        method: methodName,
        args: argsStr
    })
}

exports.translateClassName = translateClassName;
exports.translateFiled = translateFiled;
exports.translateMethod = translateMethod;