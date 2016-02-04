var formatClassName = function(name) {
    var first = name[0];
    if(first < 97 ) {
        return name;
    }
    else {
        return first.toUpperCase() + name.substr(1);
    }
}

var formatObjName = function(name) {
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

var firstCharacterToUppercase = function(name) {
    var first = name[0];
    if(first < 97 ) {
        return name;
    }
    else {
        return first.toUpperCase() + name.substr(1);
    }
}

exports.formatClassName = formatClassName;
exports.formatObjName = formatObjName;
exports.firstCharacterToUppercase = firstCharacterToUppercase;