/**
 * Created by danney on 16/6/25.
 */
var mustache = require('mustache');
var Class = require('../type/class');
var Method = require('../type/method');
var Field = require('../type/field');
var util = require('util');
var R = require('ramda');
var strUtil = require('../util/strUtil');

var createClass = function() {
    var aClass = new Class();
    aClass.superClass = 'ViewModel';
    return aClass;
}

var parameterToMap = function (x) {
    var tpl = 'map.put("{{key}}", {{value}});'
    return mustache.render(tpl, {
        key: x[0],
        value: x[1]
    });
}

//var argument = R.compose(
//    (x)=> { return 'HashMap<String, Object> map = new HashMap<>();\r' + x},
//    R.join('\r'),
//    R.map(parameterToMap),
//    R.toPairs,
//    R.prop('parameters')
//);

var argument = R.compose(
    (x)=> { return 'var map = new HashMap("string", "object");\r' + x},
    R.join('\r'),
    R.map(parameterToMap),
    R.toPairs,
    R.prop('parameters')
);

var isEmptyArgument = R.compose(
    R.isEmpty,
    R.prop('parameters')
);

var argumentInitIfExist = R.ifElse(
    isEmptyArgument,
    R.always(''),
    argument
);

var argumentNameForCalling = R.ifElse(
    isEmptyArgument,
    R.always('null'),
    R.always('map')
);

var render = function(operatorInfo, argument, argumentInit) {
    var operator = strUtil.firstCharToLowercase(operatorInfo[0])
    var method = operatorInfo[1];

    var code = '';
    code += argumentInit + '\r';
    code = code.trim();

    var tpl = '{{name}}.{{method}}({{arg}});'
    code += mustache.render(tpl, {
        name: operator,
        method: method,
        arg: argument
    });

    return code;
}

var methodBody = R.converge(
    render, [
        R.compose(R.split('.'), R.prop('action')),
        argumentNameForCalling,
        argumentInitIfExist
    ]
);

var buildMethod = function (name, body) {
    var method = new Method();
    method.name = name;
    method.returnType = 'void';
    method.body = body;
    return method;
}

var createOperatorMethod = function(aClass, name, model) {
    createOperatorField(aClass, model);

    var body = methodBody(model);
    var method = buildMethod(name, body);
    aClass.addMethod(method);
    aClass.import.push('system.type.HashMap');
}

var createOperatorField = function(aClass, model){
    var array = model.action.split('.');
    var operatorName = array[0];
    var field = new Field();
    field.type = operatorName;
    field.name = strUtil.firstCharToLowercase(operatorName);
    aClass.addField(field);
}

var createFields = function (aClass, props) {
    aClass.addFields(R.map(createFiled, props));
}

var createFiled = function (prop) {
    var filed = new Field();
    filed.type = prop.type;
    filed.name = prop.name;
    if(!util.isNullOrUndefined(prop.defaultValue)) {
        filed.defaultValue = prop.defaultValue;
    }
    filed.isProperty = true;
    return filed;
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
    if(reg.test(code)) {
        code = RegExp.$1;
    }

    var esprima = require('esprima');
    var ast = esprima.parse(code);
    return ast.body;
}

exports.createClass = createClass;
exports.createFields = createFields;
exports.createOperatorMethod = createOperatorMethod;
exports.final = final;