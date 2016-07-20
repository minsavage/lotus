/**
 * Created by danney on 16/7/8.
 */
'use strict'
let R = require('ramda');
let mustache = require('mustache');
let envExt = require('../parserAST/envExt');
let codeGenUtil = require('../util/codeGenUtil');
let classLoader = require('../type/classLoader');
let translatorMgr = require('./translatorMgr');
let generics = require('./generics');

let translateClassName = function (env, objClass) {
    let name = objClass.name;
    if(classLoader.isBuiltInType(name)) {
        return translateBulitInClassName(name);
    }
    else if(generics.isParameterizedClassName(name)) {
        return translateGenericClassName(env, name);
    }
    else {
        return name;
    }
}

let translateFiled = function (objClass, objName, fieldName, isSetter) {
    let field = objClass.findField(fieldName);
    if(field.isProperty == true) {
        return codeGenUtil.genGetterCall(objName, fieldName)
    }
    else {
        return objName + '.' + fieldName;
    }
}

let translateMethod = function (env, objClass, objName, methodName, args) {
    let argsStr = R.join(', ')(R.map(R.nth(0), args))
    if(methodName == 'new') {
        let tpl = 'new {{name}}({{args}})'
        return mustache.render(tpl, {name: objClass.name, args: argsStr})
    }
    else {
        let tpl = '{{name}}.{{method}}({{args}})'
        return mustache.render(tpl, {
            name: objName,
            method: methodName,
            args: argsStr
        })
    }
}

let translateBulitInClassName = function (name) {
    switch (name) {
        case 'int':
            return 'Integer';
        case 'string':
            return 'String';
        case 'bool':
            return 'boolean';
        case 'object':
            return 'Object';
        case 'void':
            return 'void';            
    
        default:
            return null;
    }
}

let translateGenericClassName = function (env, name) {
    let ret = generics.parseClassName(name);
    let className = ret.name;

    let mapToJavaClassName = function (name) {
        let aClass = envExt.find(env, name);
        let translator = translatorMgr.find(aClass.fullName);
        return translator.translateClassName(env, aClass);
    }

    let getNewName = R.pipe(
        R.prop('types'),
        R.map(mapToJavaClassName),
        R.join(', '),
        x => className + '<' + x + '>'
    );

    return getNewName(ret);
}

let translateImport = function (pkgName, importLine) {
    var reg = /^\$(\..*)/g;
    if(reg.test(importLine)) {
        return pkgName + RegExp.$1;
    }
    else {
        throw 'can not support to translate import: ' + importLine;
    }
}

exports.translateClassName = translateClassName;
exports.translateFiled = translateFiled;
exports.translateMethod = translateMethod;
exports.translateImport = translateImport;