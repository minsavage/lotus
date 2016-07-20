'use strict'
let Class = require('../type/class');
let Method = require('../type/method');
let Parameter = require('../type/parameter');
let Field = require('../type/field');
let util = require('util');
let nameUtil = require('../util/nameUtil');
let strUtil = require('../util/strUtil');
let R = require('ramda');
let classLoader = require('../type/classLoader');

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

let methodBodyToAST = function(aClass) {
    for(let k in aClass.methods) {
        let m = aClass.methods[k];
        if(strUtil.isNotEmpty(m.body)) {
            m.body = stringFuncToAST(m.body);
        }
    }
}

let stringFuncToAST = function (code) {
    let reg = /function\s*\(\)\s*\{\s*(.*)\s*\}/g;
    if(!reg.test(code)) {
        //code = RegExp.$1;
        code = 'function x(){' + code + '}';
    }

    let esprima = require('esprima');
    let ast = esprima.parse(code);
    return ast.body[0].body.body;
}

let initField = function (field) {
    if(R.isNil(field.defaultValue)) {
        return null;
    }

    let value = field.defaultValue;
    if(value instanceof Array) {
        value = '[' + value.toString() + ']';
    }
    else if(!classLoader.isBuiltInType(field.type)){
        if(value != 'new') {
            throw 'can not support default value in field: ' + field.name;
        }
        value = 'new ' + field.type + '()'
    }

    return field.name + ' = ' + value;
}

let initFields = R.compose(
    R.join('\r'),
    R.filter(x => x != null),
    R.map(initField),
    R.prop('fields')
)

var wrapNative = function (code) {
    return 'native(\'' + code + '\');';
}

exports.createProperty = createProperty;
exports.methodBodyToAST = methodBodyToAST;
exports.initField = initField;
exports.initFields = initFields;
exports.wrapNative = wrapNative;