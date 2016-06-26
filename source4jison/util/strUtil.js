/**
 * Created by danney on 16/6/26.
 */
var util = require('util');

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

exports.isEmpty = isEmpty;
exports.isNotEmpty = isNotEmpty;
exports.firstCharToUppercase = firstCharToUppercase;