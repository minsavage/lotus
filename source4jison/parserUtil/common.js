'use strict'
let Class = require('../type/class');
let Method = require('../type/method');
let Parameter = require('../type/parameter');
let Field = require('../type/field');
let util = require('util');
let nameUtil = require('../util/nameUtil');
let strUtil = require('../util/strUtil');
let R = require('ramda');

let createProperty = R.curry(function (aClass, prop) {
    aClass.addField(createFiled(prop));
    aClass.addMethod(createGetter(prop));
    aClass.addMethod(createSetter(prop));
})

let createFiled = function (prop) {
    let filed = new Field();
    filed.type = prop.type;
    filed.name = prop.name;
    if(!util.isNullOrUndefined(prop.defaultValue)) {
        filed.defaultValue = prop.defaultValue;
    }
    filed.isProperty = true;
    return filed;
}

let createGetter = function (prop) {
    let body = 'return ' + prop.name;
    let native = 'native(\'' + body + '\')'

    let method = new Method();
    method.name = nameUtil.getGetterMethodName(prop.type, prop.name);
    method.returnType = prop.type;
    method.body = native;
    method.modifiers.push('public');
    return method;
}

let createSetter = function (prop) {
    let body = 'this.' + prop.name + ' = ' + prop.name;
    let native = 'native(\'' + body + '\')'

    let method = new Method();
    method.name = nameUtil.getSetterMethodName(prop.name);
    method.returnType = 'void';
    let param = new Parameter();
    param.type = prop.type;
    param.name = prop.name;
    method.parameters.push(param)
    method.body = native;
    method.modifiers.push('public');
    return method;
}

var methodBodyToAST = function(aClass) {
    for(var k in aClass.methods) {
        var m = aClass.methods[k];
        if(strUtil.isNotEmpty(m.body)) {
            m.body = stringFuncToAST(m.body);
        }
    }
}

var stringFuncToAST = function (code) {
    var reg = /function\s*\(\)\s*\{\s*(.*)\s*\}/g;
    if(!reg.test(code)) {
        //code = RegExp.$1;
        code = 'function x(){' + code + '}';
    }

    var esprima = require('esprima');
    var ast = esprima.parse(code);
    return ast.body[0].body.body;
}

exports.createProperty = createProperty;
exports.methodBodyToAST = methodBodyToAST;