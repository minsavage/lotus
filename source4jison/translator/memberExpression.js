/**
 * Created by danney on 16/6/26.
 */
var translatorMgr = require('./translatorMgr');
var envExt = require('./envExt');

var translate = function (env, ast, isSetter) {
    var object = ast.object;
    var property = ast.property;

    var objName = null;
    var objType = null;

    if(object.type == 'Identifier') {
        objType = envExt.find(env, object.name);
        objName = object.name;
    }
    else {
        var translate = translatorMgr.find(object.type).translate;
        var ret = translate(env, object);
        objName = ret[0];
        objType = ret[1];
    }

    var translator = require('./javaClassTranslator');
    var ret = translator.translateFiled(objType, objName, property.name, isSetter);
    return ret;
}

exports.translate = translate;