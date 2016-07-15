'use strict'
var R = require('ramda');
var envExt = require('./envExt');
var mustache = require('mustache');
var classTranslatorMgr = require('./classTranslatorMgr');
var javaClassTranslator = require('./javaClassTranslator');


var translateMethod = function (objClass, objName, methodName, args) {
    if(methodName == 'new') {
        return handleNewMethod(objClass, objName, methodName, args);
    }
    else {
        return javaClassTranslator.translateMethod(objClass, objName, methodName, args);
    }
}

var mapToJavaType = R.curry(function (env, name) {
    let nameWithoutQ = name.substr(1, name.length-2)
    let aCLass = envExt.find(env, nameWithoutQ);
    var translator = classTranslatorMgr.find(aCLass.fullName);
    return translator.translateClassName(aCLass);
});

var handleNewMethod = function (objClass, objName, methodName, args) {
    if(args.length != 2) {
        throw 'HashMap constructor arguments error, the first and second type should be generics type';
    }

    let env = envExt.createEnv(objClass);
    let argsForJavaType = R.map(mapToJavaType(env), args);
    let genericsArgs = R.join(', ', argsForJavaType);

    let tpl = 'new HashMap<{{generics}}>()'
    let code = mustache.render(tpl, {generics: genericsArgs});
    return [code, objClass]
}

exports.translateMethod = translateMethod;