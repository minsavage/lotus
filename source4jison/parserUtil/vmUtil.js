/**
 * Created by danney on 16/6/25.
 */
'use strict'
let R = require('ramda');
let mustache = require('mustache');
let Class = require('../typeRN/class');
let Method = require('../typeRN/method');
let Field = require('../typeRN/field');
let util = require('util');
let strUtil = require('../util/strUtil');
let common = require('./common');

let createClass = function (model) {
    let importNativeLines = ['{observable, transaction} from \'mobx\''];
    return Class.create(model.name, model.fields, model.methods, 
        model.import, null, ['export', 'default'], null, importNativeLines);
}

let createConstructor = function (model) {
    let body = 'super(c)';
    body = common.wrapNative(body);
    body += common.initFields(model);

    let param = Parameter.create('Context', 'c', []);
    let method = Method.create(model.name, '', param, body, ['public'], null);
    return {
        method: method,
        importNative: ['android.content.Context']
    }
}

let argument = R.compose(
    (x) => 'let params = {\r' + x + '\r}',
    R.join(', '),
    R.map((x) => x[0] + ': this.' + x[1]),
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

let render = function (operatorInfo, argument, argumentInit) {
    let operator = strUtil.firstCharToLowercase(operatorInfo[0])
    let method = operatorInfo[1];

    let codeBlock = [];
    if(strUtil.isNotEmpty(argumentInit)) {
        codeBlock.push(argumentInit);
    }

    let tpl = 'this.{{name}}.{{method}}(params);'
    let code = mustache.render(tpl, {
        name: operator,
        method: method,
        arg: argument
    });
    codeBlock.push(code);

    return R.join('\r', codeBlock)
}

let methodBody = R.converge(
    render, [
        R.compose(R.split('.'), R.prop('action')),
        argumentNameForCalling,
        argumentInitIfExist
    ]
);

let buildMethod = function (name, body) {
    return Method.create(name, [], body)
}

let createOperator = function (name, model) {
    let field = createOperatorField(model);

    let body = methodBody(model);
    let method = buildMethod(name, body);
    return {
        field: field,
        method: method
    }
    //aClass.import.push('system.type.HashMap');
}

let createOperatorField = function (model) {
    let array = model.action.split('.');
    let operatorName = array[0];
    let def = 'new ' + operatorName + '()';
    return Field.create(strUtil.firstCharToLowercase(operatorName), def);
}

let createFields = function (props) {
    return R.map(createFiled, props)
}

let createFiled = function (prop) {
    return Field.create(prop.name, prop.defaultValue, null, ['@observable']);
}

// let final = function(aClass) {
//     createConstructor(aClass);
//     aClass.import.push('$.base.ViewModel');

//     for(let k in aClass.methods) {
//         let m = aClass.methods[k];
//         if(strUtil.isNotEmpty(m.body)) {
//             m.body = stringFuncToAST(m.body);
//         }
//     }
// }

// let stringFuncToAST = function (code) {
//     let reg = /function\s*\(\)\s*\{\s*(.*)\s*\}/g;
//     if(reg.test(code)) {
//         code = RegExp.$1;
//     }

//     let esprima = require('esprima');
//     let ast = esprima.parse(code);
//     return ast.body;
// }

exports.createClass = createClass;
exports.createFields = createFields;
exports.createOperator = createOperator;
