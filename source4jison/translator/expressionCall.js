/**
 * Created by danney on 16/6/26.
 */
var R = require('ramda');
var translatorMgr = require('./translatorMgr');
var envExt = require('./envExt');

var translate = function (env, ast) {
    var callee = ast.callee;
    if(callee.type == 'Identifier') {
        var handler = findSystemFunction(callee.name);
        if(!R.isNil(handler)) {
            return handler(ast);
        }
    }
    else if(callee.type == 'MemberExpression') {
        return handleMemberCall(env, ast);
    }
    else {
        throw 'can not support callee type for call expression: ' + callee.type;
    }
}

var mapArg = R.curry(function (env, ast) {
    return translatorMgr.findAndTranslate(env, ast)[0];
});

var mapArgWithEnv = R.compose(mapArg, R.nthArg(0));
var argsProp = R.compose(R.prop('arguments'), R.nthArg(1));
var args = R.converge(R.map, [mapArgWithEnv, argsProp]);

var handleMemberCall = function (env, ast) {
    var calleeObj = ast.callee.object;
    var calleeProp = ast.callee.property;

    var calleeObjRet = translatorMgr.findAndTranslate(env, calleeObj);
    var objName = calleeObjRet[0];
    var objType = calleeObjRet[1];

    var arguments = args(env, ast);

    var classTranslatorMgr = require('./classTranslatorMgr');
    var classTranslator = classTranslatorMgr.find(objType.fullName);
    var ret = classTranslator.translateMethod(objType, objName, calleeProp.name, arguments);
    return ret;
}

var findSystemFunction = function (name) {
    var map = {
        'showPage': showPage,
        'closePage': closePage,
        'native': native
    }

    return map[name];
}

var showPage = function () {
    
    
}

var closePage = function () {

}

var native = function (ast) {
    return ast.arguments[0].value;
}



exports.translate = translate;