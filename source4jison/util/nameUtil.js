/**
 * Created by danney on 16/7/3.
 */
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

exports.getOperatorMethodName = getOperatorMethodName;