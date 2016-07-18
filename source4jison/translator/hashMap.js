'use strict'
var R = require('ramda');
var envExt = require('../parserAST/envExt');
var mustache = require('mustache');
var javaClassTranslator = require('./default');
var generics = require('./generics');

var translateClassName = function (env, objClass) {
    return javaClassTranslator.translateClassName(env, objClass);
}

var translateMethod = function (env, objClass, objName, methodName, args) {
    if(methodName == 'new') {
        return handleNewMethod(env, objClass, objName, methodName, args);
    }
    else {
        return javaClassTranslator.translateMethod(env, objClass, objName, methodName, args);
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
    var javaClassName = javaClassTranslator.translateClassName(env, instanceClass);
    let code = 'new ' + javaClassName + '()';
    return [code, instanceClass];
}

exports.translateMethod = translateMethod;
exports.translateClassName = translateClassName;