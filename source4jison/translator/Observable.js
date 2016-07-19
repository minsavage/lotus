'use strict'
let R = require('ramda');
let envExt = require('../parserAST/envExt');
let mustache = require('mustache');
let defaultTranslator = require('./default');
let generics = require('./generics');

let translateClassName = function (env, objClass) {
    return defaultTranslator.translateClassName(env, objClass);
}

let translateMethod = function (env, objClass, objName, methodName, args) {
    return defaultTranslator.translateMethod(env, objClass, objName, methodName, args);
}

let translateImport = function (pkgName, importLine) {
    return 'rx.Observable';
}

exports.translateClassName = translateClassName;
exports.translateMethod = translateMethod;
exports.translateImport = translateImport;