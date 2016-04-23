/**
 * Created by danney on 16/1/24.
 */
var stringUtil = require('../util/stringUtil');

var LayoutRecorder = function() {
    this._result = '';
    this._namespaces = {};
}

LayoutRecorder.prototype.addResult = function(xml) {
    this._result = xml;
}

LayoutRecorder.prototype.addNamespace = function(namespace) {
    if(stringUtil.isNotEmpty(namespace)) {
        this._namespaces[namespace] = true;
    }
}

//输入参数是一个以namespace为key的map，而不是一个数组
//此方法主要用于LayoutRecorder的namespace列表合并
LayoutRecorder.prototype.addNamespaces = function(namespaces) {
    for(var k in namespaces) {
        this._namespaces[k] = true;
    }
}

LayoutRecorder.prototype.getResult = function() {
    return this._result;
}

LayoutRecorder.prototype.getNamespaces = function() {
    return this._namespaces;
}

module.exports = LayoutRecorder;