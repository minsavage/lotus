/**
 * Created by danney on 16/6/26.
 */
var R = require('ramda');
var translatorMgr = require('./translatorMgr');
var envExt = require('./envExt');

var mapArg = R.curry(function (env, ast) {
    return translatorMgr.findAndTranslate(env, ast)[0];
});

var mapArgWithEnv = R.compose(mapArg, R.nthArg(0));
var argsProp = R.compose(R.prop('arguments'), R.nthArg(1));
var args = R.converge(R.map, [mapArgWithEnv, argsProp]);

var translate = function (env, ast) {
    var calleeObj = ast.callee.object;
    var calleeProp = ast.callee.property;

    var calleeObjRet = translatorMgr.findAndTranslate(env, calleeObj);
    var objName = calleeObjRet[0];
    var objType = calleeObjRet[1];

    var arguments = args(env, ast);

    var classTranslatorMgr = require('./classTranslatorMgr');
    var classTranslator = classTranslatorMgr.find(objType.fullName);
    var code = classTranslator.translateMethod(env, objType, objName, calleeProp.name, arguments);

    var classEnv = envExt.createEnv(objType);
    var methodReturnType = envExt.findMethodReturnType(classEnv, calleeProp.name);

    return [code, methodReturnType];
}


exports.translate = translate;