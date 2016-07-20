/**
 * Created by danney on 16/6/25.
 */
'use strict'
var R = require('ramda');
var mustache = require('mustache');
var Class = require('../type/class');
var Method = require('../type/method');
var Parameter = require('../type/parameter');
var Field = require('../type/field');
var util = require('util');
var strUtil = require('../util/strUtil');
var nameUtil = require('../util/nameUtil');
let viewModelUtil = require('./viewController/viewModel');
let common = require('./common');

var createClass = function() {
    var vcClass = new Class();
    vcClass.superClass = 'ViewController';
    return vcClass;
}

var createEssentialMethod = function(yy) {
    var fns = [];
    fns.push(createOnCreateMethod(yy.vc.onCreate));
    fns.push(createOnCreateViewMethod(yy, yy.vc.onCreateView));
    fns.push(createOnDestroyMethod(yy.vc.onDestroy));
    yy.class.addMethods(fns);
}

var createOnCreateMethod = function(code) {
    var method = new Method();

    var body = 'native(\'super.onCreate(savedInstanceState)\')';
    body = body + '\r' + code;

    var parameter = new Parameter();
    parameter.type = 'Bundle';
    parameter.name = 'savedInstanceState';

    method.name = 'onCreate';
    method.returnType = 'void';
    method.annotations.push('@Override');
    method.parameters.push(parameter);
    method.body = body;
    method.modifiers.push('public');
    return method;
}

var createOnCreateViewMethod = function(yy, code) {
    let xmlFileName  = nameUtil.vcToXmlFileName(yy.class.name);
    let line1 = 'binding = DataBindingUtil.inflate(inflater, R.layout.{{xml}}, container, true);'
    line1 = mustache.render(line1, {xml: xmlFileName});
    
    let line2 = yy.vc.viewModelsInfo[0].bindingSetter;
    let line3 = 'View view = binding.getRoot()';

    let lines = common.wrapNative(line1 + line2 + line3);

    let lineEnd = common.wrapNative('return view');
    lines = [lines, code , lineEnd];

    let makeBody = R.compose(R.join(''), R.filter(x=>strUtil.isNotEmpty(x)));
    let body = makeBody(lines);

    var method = new Method();
    var parameter;
    parameter = new Parameter();
    parameter.type = 'LayoutInflater';
    parameter.name = 'inflater';
    method.parameters.push(parameter);

    parameter = new Parameter();
    parameter.type = 'ViewGroup';
    parameter.name = 'container';
    method.parameters.push(parameter);

    parameter = new Parameter();
    parameter.type = 'Bundle';
    parameter.name = 'savedInstanceState';
    method.parameters.push(parameter);

    method.name = 'onCreateView';
    method.returnType = 'View';
    method.annotations.push('@Override');
    method.modifiers.push('public');

    method.body = body;
    return method;
}

var createOnDestroyMethod = function(code) {
    var method = new Method();

    var body = common.wrapNative('super.onDestroy()');
    body = body + '\r' + code;

    method.name = 'onDestroy';
    method.returnType = 'void';
    method.annotations.push('@Override');
    method.modifiers.push('public');
    method.body = body.trim();
    return method;
}

var createViewModelsInfo = function (aClass, viewModels) {
    let ret = viewModelUtil.createViewModelsInfo(viewModels);
    R.map(function(info){
        aClass.addField(info.field);
    }, ret);
    return ret;
}

var createBindingField = function(aClass) {
    var field = new Field();
    field.type = nameUtil.vcToBindingName(aClass.name);
    field.name = 'binding';
    aClass.addField(field);
    let importLine = '$.databinding.' + field.type;
    aClass.import.push(importLine);
}

var createEvents = function(vcClass, model) {
    if(util.isNullOrUndefined(model.event)) {
        return null;
    }

    if(util.isNullOrUndefined(model.id)) {
        throw 'missing widget id when parse events'
    }

    var fns = [];
    for(var name in model.event) {
        var func = model.event[name];
        fns.push(createEvent(model.id, name, func));
    }
    vcClass.addMethods(fns);
}

var createEvent = function (id, name, func) {
    name = strUtil.firstCharToUppercase(name);

    var annotationTpl = '@{{name}}(R.id.{{id}})';
    var annotation = mustache.render(annotationTpl, {
        name: name,
        id: id
    })

    var method = new Method();
    method.name = id + name;
    method.returnType = 'void';
    method.parameters = [];
    method.annotations.push(annotation);
    method.body = func;
    return method;
}



var final = function(vcClass) {
    createBindingField(vcClass);

    vcClass.import.push('$.R');
    vcClass.import.push('$.base.ViewController');
    vcClass.import.push('$.base.ViewModelMgr');
    
    vcClass.addNativeImports([
        'android.databinding.DataBindingUtil',
        'android.os.Bundle',
        'android.view.LayoutInflater',
        'android.view.ViewGroup',
        'android.view.View'
    ])

    for(var k in vcClass.methods) {
        var m = vcClass.methods[k];
        if(strUtil.isNotEmpty(m.body)) {
            m.body = stringFuncToAST(m.body);
        }
    }
}

var stringFuncToAST = function (code) {
    var reg = /function\s*\(\w*\)\s*\{\s*((.*\s*)*)\}/g;
    if(reg.test(code)) {
        code = RegExp.$1;
    }

    var esprima = require('esprima');
    var ast = esprima.parse(code);
    return ast.body;
}

exports.createClass = createClass;
exports.createEssentialMethod = createEssentialMethod;
exports.createViewModelsInfo = createViewModelsInfo;
exports.createEvents = createEvents;
exports.final = final;