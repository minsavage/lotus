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

exports.isEmpty = isEmpty;
exports.isNotEmpty = isNotEmpty;
exports.firstCharToUppercase = firstCharToUppercase;
exports.firstCharToLowercase = firstCharToLowercase;
exports.splitWithTrim = splitWithTrim;