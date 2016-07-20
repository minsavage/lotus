/**
 * Created by danney on 16/6/26.
 */
var util = require('util');
var R = require('ramda');

var isNotEmpty = function(str) {
    if(util.isString(str) && str.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

var isEmpty = function(str) {
    return !isNotEmpty(str);
}

var firstCharToUppercase = function(str) {
    if(isEmpty(str)) {
        throw 'string is empty, can not make first character to uppercase';
    }

    return str[0] < 97 ? str: str[0].toUpperCase() + str.substr(1);
}

var firstCharToLowercase = function(str) {
    if(isEmpty(str)) {
        throw 'string is empty, can not make first character to lowercase';
    }

    return str[0] >= 97 ? str: str[0].toLowerCase() + str.substr(1);
}

var splitWithTrim = R.curry(R.compose(R.map(R.trim), R.split));

var withoutSuffix = function(str, suffix) {
    var reg = '^(.*)' + suffix + '$';
    reg = new RegExp(reg);
    if(reg.test(str)) {
        return RegExp.$1;
    }
    else {
        return str;
    }
}

var toLowerCaseWithUnderline = function(str) {
    var newStr = '';
    var start = 0;
    var end = 0;
    for(var i = 1; i < str.length; i++) {
        if(str[i] < 'a') {
            end = i;
            newStr += str.substring(start, end).toLowerCase() + '_';
            start = end;
        }
    }
    newStr += str.substr(start, str.length).toLowerCase();
    return newStr;
}

exports.isEmpty = isEmpty;
exports.isNotEmpty = isNotEmpty;
exports.firstCharToUppercase = firstCharToUppercase;
exports.firstCharToLowercase = firstCharToLowercase;
exports.splitWithTrim = splitWithTrim;
exports.withoutSuffix = withoutSuffix;
exports.toLowerCaseWithUnderline = toLowerCaseWithUnderline;