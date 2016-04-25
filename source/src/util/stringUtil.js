var util = require('util');

var isNotEmpty = function(str) {
    if(util.isNullOrUndefined(str) || !util.isString(str)) {
        return false;
    }

    if(str.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

var firstCharacterToUppercase = function(name) {
    var first = name[0];
    if(first < 97 ) {
        return name;
    }
    else {
        return first.toUpperCase() + name.substr(1);
    }
}

var firstCharacterToLowercase = function(name) {
    var first = name[0];
    if(first >= 97 ) {
        return name;
    }
    else {
        var l = first.toLowerCase();
        var s = name.substr(1);
        return  l + s;
    }
}

var withoutSuffix = function(str, suffix) {
    var i = str.indexOf(suffix);
    if (i < 0) {
        return str;
    }
    else if(i == 0) {
        return '';
    }
    else {
        return str.substring(0, i);
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

var removeAllWhiteSpaceCharacters = function(str) {
    if(util.isString(str)) {
        return str.replace(/\s+/g, '');
    }
    else {
        return null;
    }
}

exports.isNotEmpty = isNotEmpty;
exports.withoutSuffix = withoutSuffix;
exports.firstCharacterToUppercase = firstCharacterToUppercase;
exports.firstCharacterToLowercase = firstCharacterToLowercase;
exports.toLowerCaseWithUnderline = toLowerCaseWithUnderline;
exports.removeAllWhiteSpaceCharacters = removeAllWhiteSpaceCharacters;