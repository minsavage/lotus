/**
 * Created by danney on 16/7/8.
 */
'use strict'
var R = require('ramda');
var mustache = require('mustache');
var envExt = require('./envExt');
var createEnv = require('./envExt').createEnv;
var codeGenUtil = require('../util/codeGenUtil');
var classLoader = require('../type/classLoader');
var classTranslatorMgr = require('./classTranslatorMgr');
var generics = require('../translatorForJavaClass/generics');

var translateClassName = function (env, objClass) {
    let name = objClass.name;
    if(classLoader.isBuiltInType(name)) {
        return translateBulitInClassName(name);
    }
    else if(generics.isParameterizedGenericClass(name)) {
        return translateGenericClassName(env, name);
    }
    else {
        return name;
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

var translateMethod = function (env, objClass, objName, methodName, args) {
    var argsStr = R.join(', ', args);
    var tpl = '{{name}}.{{method}}({{args}})'
    return mustache.render(tpl, {
        name: objName,
        method: methodName,
        args: argsStr
    })
}

var translateBulitInClassName = function (name) {
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

var translateGenericClassName = function (env, name) {
    var ret = generics.parseClassName(name);
    var className = ret.name;

    var mapToJavaClassName = function (name) {
        let aClass = envExt.find(env, name);
        var translator = classTranslatorMgr.find(aClass.fullName);
        return translator.translateClassName(env, aClass);
    }

    var getNewName = R.pipe(
        R.prop('types'),
        R.map(mapToJavaClassName),
        R.tap(x=>console.log(x)),
        R.join(', '),
        R.of,
        R.map(x=>className + '<' + x + '>'),
        
        R.join('')
    );

    return getNewName(ret);
}


exports.translateClassName = translateClassName;
exports.translateFiled = translateFiled;
exports.translateMethod = translateMethod;