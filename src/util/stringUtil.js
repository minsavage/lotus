//var formatClassName = function(name) {
//    var first = name[0];
//    if(first < 97 ) {
//        return name;
//    }
//    else {
//        return first.toUpperCase() + name.substr(1);
//    }
//}
//
//var formatObjName = function(name) {
//    var first = name[0];
//    if(first >= 97 ) {
//        return name;
//    }
//    else {
//        var l = first.toLowerCase();
//        var s = name.substr(1);
//        return  l + s;
//    }
//}

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

var vcToXmlFileName = function(name) {
    var str = withoutSuffix(name, 'ViewController');
    return 'vc_' + toLowerCaseWithUnderline(str);
}

var vcToBindingName = function(name) {
    var str = withoutSuffix(name, 'ViewController');
    return 'Vc' + str + 'Binding';
}

exports.firstCharacterToUppercase = firstCharacterToUppercase;
exports.firstCharacterToLowercase = firstCharacterToLowercase;
exports.withoutSuffix = withoutSuffix;
exports.toLowerCaseWithUnderline = toLowerCaseWithUnderline;
exports.vcToXmlFileName = vcToXmlFileName;
exports.vcToBindingName = vcToBindingName;
exports.isNotEmpty = isNotEmpty;


