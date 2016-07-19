/**
 * Created by danney on 16/6/25.
 */
'use strict'
var R = require('ramda');
var Class = require('../type/class');
var Field = require('../type/field');
var Method = require('../type/method');
var Parameter = require('../type/parameter');
var util = require('util');
var strUtil = require('../util/strUtil')
var queryMethod = require('./operator/queryMethod');
var queryMethodService = require('./operator/queryMethodService');


var createQueryMethod = function (aClass, model) {
    aClass.addMethod(queryMethod.make(model));
    aClass.import.push('system.rx.Observable');
    aClass.import.push('system.type.HashMap');
    aClass.import.push('$.operator.RemoteOperatorService');
    aClass.import.push('$.base.RemoteOperatorServiceUtil');
}

var createQueryMethodService = function (model) {
    return queryMethodService.make(model);
}

var createRemoteServiceInterface = function (methods, operators) {
    var aClass = new Class();
    aClass.name = 'RemoteOperatorService';
    aClass.type = 'interface';
    aClass.addMethods(methods);

    var getImportList = R.compose(
        R.dropRepeats,
        R.sort((x,y)=>x>y),
        R.flatten,
        R.map(R.prop('import'))
    )
    
    aClass.import = getImportList(operators);
    operators.push(aClass);
}

var createClass = function() {
    var aClass = new Class();
    return aClass;
}

let createConverter = function (converter) {
    return converter.op + '(' + converter.action + ')';
}

var final = function(aClass) {
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

exports.createClass = createClass;
exports.createQueryMethod = createQueryMethod;
exports.createQueryMethodService = createQueryMethodService;
exports.createRemoteServiceInterface = createRemoteServiceInterface;
exports.createConverter = createConverter;
exports.final = final;