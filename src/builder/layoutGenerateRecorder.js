/**
 * Created by danney on 16/1/24.
 */
var stringUtil = require('../util/stringUtil');

var LayoutGenerateRecorder = function() {
    this._result = '';
    this._namespaces = {};
}

LayoutGenerateRecorder.prototype.addResult = function(xml) {
    this._result = xml;
}

LayoutGenerateRecorder.prototype.addNamespace = function(namespace) {
    if(stringUtil.isNotEmpty(namespace)) {
        this._namespaces[namespace] = true;
    }
}

//输入参数是一个以namespace为key的map，而不是一个数组
//此方法主要用于LayoutGenerateRecorder的namespace列表合并
LayoutGenerateRecorder.prototype.addNamespaces = function(namespaces) {
    for(var k in namespaces) {
        this._namespaces[k] = true;
    }
}

LayoutGenerateRecorder.prototype.getResult = function() {
    return this._result;
}

LayoutGenerateRecorder.prototype.getNamespaces = function() {
    return this._namespaces;
}

module.exports = LayoutGenerateRecorder;