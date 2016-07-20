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

let vcToXmlFileName = function(name) {
    var str = strUtil.withoutSuffix(name, 'ViewController');
    return 'vc_' + strUtil.toLowerCaseWithUnderline(str);
}

let vcToBindingName = function(name) {
    return 'Vc' + strUtil.withoutSuffix(name, 'ViewController') + 'Binding';
}

let getViewModelObserverName = function (viewModelName) {
    return viewModelName + 'Observer';
}

exports.getOperatorMethodName = getOperatorMethodName;
exports.getGetterMethodName = getGetterMethodName;
exports.getSetterMethodName = getSetterMethodName;
exports.getViewModelObserverName = getViewModelObserverName;
exports.vcToBindingName = vcToBindingName;
exports.vcToXmlFileName = vcToXmlFileName;