/**
 * Created by danney on 16/6/25.
 */
'use strict'
let R = require('ramda');
let mustache = require('mustache');
let Class = require('../type/class');
let Method = require('../type/method');
let Field = require('../type/field');
let Parameter = require('../type/parameter');
let util = require('util');
let strUtil = require('../util/strUtil');
let common = require('./common');

let createClass = function() {
    let aClass = new Class();
    aClass.superClass = 'ViewModel';
    return aClass;
}

let createConstructor = function(aClass) {
    let method = new Method();
    method.name = aClass.name;
    method.returnType = '';
    method.modifiers.push('public');

    let param = new Parameter();
    param.type = 'Context';
    param.name = 'c';
    method.parameters.push(param);

    let body = 'super(c)';
    method.body = 'native(\'' + body + '\');\r';
    method.body += common.initFields(aClass);
    aClass.methods.unshift(method);
    aClass.importNative.push('android.content.Context');
}

let parameterToMap = function (x) {
    let tpl = 'map.put("{{key}}", {{value}});'
    return mustache.render(tpl, {key: x[0],value: x[1]});
}

let argument = R.compose(
    (x)=> { return 'let map = new HashMap("string", "object");\r' + x},
    R.join('\r'),
    R.map(parameterToMap),
    R.toPairs,
    R.prop('parameters')
);

let isEmptyArgument = R.compose(
    R.isEmpty,
    R.prop('parameters')
);

let argumentInitIfExist = R.ifElse(
    isEmptyArgument,
    R.always(''),
    argument
);

let argumentNameForCalling = R.ifElse(
    isEmptyArgument,
    R.always('null'),
    R.always('map')
);

let render = function(operatorInfo, argument, argumentInit) {
    let operator = strUtil.firstCharToLowercase(operatorInfo[0])
    let method = operatorInfo[1];

    let code = '';
    code += argumentInit + '\r';
    code = code.trim();

    let tpl = '{{name}}.{{method}}({{arg}});'
    code += mustache.render(tpl, {
        name: operator,
        method: method,
        arg: argument
    });

    return code;
}

let methodBody = R.converge(
    render, [
        R.compose(R.split('.'), R.prop('action')),
        argumentNameForCalling,
        argumentInitIfExist
    ]
);

let buildMethod = function (name, body) {
    let method = new Method();
    method.name = name;
    method.returnType = 'void';
    method.body = body;
    return method;
}

let createOperatorMethod = function(aClass, name, model) {
    createOperatorField(aClass, model);

    let body = methodBody(model);
    let method = buildMethod(name, body);
    aClass.addMethod(method);
    aClass.import.push('system.type.HashMap');
}

let createOperatorField = function(aClass, model){
    let array = model.action.split('.');
    let operatorName = array[0];
    let field = new Field();
    field.type = operatorName;
    field.name = strUtil.firstCharToLowercase(operatorName);
    field.defaultValue = 'new';
    field.modifiers.push('private');
    aClass.addField(field);
}

let createFields = function (aClass, props) {
    aClass.addFields(R.map(createFiled, props));
}

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

let final = function(aClass) {
    createConstructor(aClass);
    aClass.import.push('$.base.ViewModel');

    for(let k in aClass.methods) {
        let m = aClass.methods[k];
        if(strUtil.isNotEmpty(m.body)) {
            m.body = stringFuncToAST(m.body);
        }
    }
}

let stringFuncToAST = function (code) {
    let reg = /function\s*\(\)\s*\{\s*(.*)\s*\}/g;
    if(reg.test(code)) {
        code = RegExp.$1;
    }

    let esprima = require('esprima');
    let ast = esprima.parse(code);
    return ast.body;
}

exports.createClass = createClass;
exports.createFields = createFields;
exports.createOperatorMethod = createOperatorMethod;
exports.final = final;