var javaClassTranslator = require('./javaClassTranslator');

var translateMethod = function (objClass, objName, methodName, args) {
    if(methodName == 'new') {
        return handleNewMethod(objClass, objName, methodName, args);
    }
    else {
        return javaClassTranslator.translateMethod(objClass, objName, methodName, args);
    }
}

var handleNewMethod = function (objClass, objName, methodName, args) {
    var code = 'new HashMap<String, Object>()'; 
    return [code, objClass]
}

exports.translateMethod = translateMethod;