/**
 * Created by danney on 16/1/20.
 */
var util = require('util');
var stringUtil = require('./stringUtil');
var codeGenerateUtil = require('./codeGenerateUtil');

var translate = function(actions) {
    if(util.isFunction(actions)) {
        return buildActionByFunction(actions);
    }
    else if(util.isObject(actions)) {
        return buildActionByKeyValue(actions);
    }
    else {
        return '';
    }
}

var buildActionByKeyValue = function(map) {
    var result = '';
    for(var leftValue in map) {
        var rightValue = map[leftValue];
        result += codeGenerateUtil.generateSetterCall(null, leftValue, rightValue);
    }
    return result;
}

var buildActionByFunction = function(func) {
    var str = func.toString();
    var offset = 13;
    return str = str.substr(offset, str.length-offset-1).trim();
}

exports.translate = translate;