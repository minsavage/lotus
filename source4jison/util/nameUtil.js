/**
 * Created by danney on 16/7/3.
 */
'use strict'
var strUtil = require('./strUtil');

var getOperatorMethodName = function(actionName, modelName) {
    var name = getClassNameMayBeInGenerics(modelName);
    return actionName + strUtil.firstCharToUppercase(name)
}

var getClassNameMayBeInGenerics = function(name) {
    var reg = /^\w+<(\w+)>$/g;
    if(reg.test(name)) {
        return RegExp.$1;
    }
    else {
        return name;
    }
}

let getGetterMethodName = function(type, propName) {
    let pre = type != 'bool' ? 'get': 'is';
    return pre + strUtil.firstCharToUppercase(propName);
}

let getSetterMethodName = function(propName) {
    return 'set' + strUtil.firstCharToUppercase(propName);
}

exports.getOperatorMethodName = getOperatorMethodName;
exports.getGetterMethodName = getGetterMethodName;
exports.getSetterMethodName = getSetterMethodName;