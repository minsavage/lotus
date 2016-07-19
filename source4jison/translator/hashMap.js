'use strict'
var R = require('ramda');
var envExt = require('../parserAST/envExt');
var mustache = require('mustache');
var defaultTranslator = require('./default');
var generics = require('./generics');

var translateClassName = function (env, objClass) {
    return defaultTranslator.translateClassName(env, objClass);
}

var translateMethod = function (env, objClass, objName, methodName, args) {
    if(methodName == 'new') {
        return handleNewMethod(env, objClass, objName, methodName, args);
    }
    else if(methodName == 'get') {
        return handleGetMethod(env, objClass, objName, methodName, args);
    }
    else {
        return defaultTranslator.translateMethod(env, objClass, objName, methodName, args);
    }
}

var handleNewMethod = function (env, objClass, objName, methodName, args) {
    if(args.length < 2) {
        throw 'HashMap constructor arguments error, the first and second type should be generics type';
    }

    let getInstanceClass = R.pipe(
        R.take(2),
        R.map(x=>x.substr(1, x.length-2)),
        R.curry(generics.instantiate)(objClass)
    )

    let instanceClass = getInstanceClass(args);
    var javaClassName = defaultTranslator.translateClassName(env, instanceClass);
    let code = 'new ' + javaClassName + '()';
    return [code, instanceClass];
}

let handleGetMethod = function (env, objClass, objName, methodName, args) {
    let key = args[0][0];
    key = key.replace(/'/g, '"');
    if(args.length == 2) {
        let tpl = '({{type}}){{obj}}.get({{key}})';
        let type = args[1][0].replace(/"/g, '');
        type = objClass.loadType(type);
        let typeJavaClassName = defaultTranslator.translateClassName(env, type)
        let code = mustache.render(tpl, {obj: objName, key: key, type: typeJavaClassName});
        return [code, type];
    }
    else {
        let tpl = '{{obj}}.get({{key}})';
        return mustache.render(tpl, {obj: objName, key: key})
    }
}

let translateImport = function (pkgName, importLine) {
    return 'java.util.HashMap';
}

exports.translateMethod = translateMethod;
exports.translateClassName = translateClassName;
exports.translateImport = translateImport;