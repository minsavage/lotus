/**
 * Created by danney on 16/6/26.
 */
'use strict'
var R = require('ramda');
var translatorMgr = require('./parserMgr');
var envExt = require('./envExt');
var generics = require('../translator/generics');

var translate = function (env, ast) {
    let calleeObj = ast.callee.object;
    let calleeObjRet = translatorMgr.findAndTranslate(env, calleeObj);
    let objName = calleeObjRet[0];
    let objType = calleeObjRet[1];

    let calleeProp = ast.callee.property;
    if(calleeProp.type != 'Identifier') {
        throw 'callee.property.type must be identifier: ' + calleeProp.type;
    }

    let methodName = calleeProp.name;
    let methods = objType.findMethods(methodName);

    let ret = translateArgsAndVerifyMethodsPrototype(env, objType, ast.arguments, methods);
    let argsRet = ret[0]
    let method = ret[1];
    let methodReturnType = objType.loadType(method.returnType);

    let classTranslatorMgr = require('../translator/translatorMgr');
    let classTranslator = classTranslatorMgr.find(objType.fullName);
    let codeRet = classTranslator.translateMethod(env, objType, objName, calleeProp.name, argsRet);
    let code = null;
    if(codeRet instanceof Array) {
        code = codeRet[0];
        if(!R.isNil(codeRet[1])) {
            methodReturnType = codeRet[1];
        }
    }
    else {
        code = codeRet;
    }

    return [code, methodReturnType];
}

var translateArgWithMethodParams = R.curry(function (env, objType, argWithParamPrototype) {
    let argAST = argWithParamPrototype[0];
    let paramPrototype = argWithParamPrototype[1];
    let paramPrototypeClass = objType.loadType(paramPrototype.type);

    let ret = null;
    if('FunctionExpression' == argAST.type ||
       'ArrowFunctionExpression' == argAST.type ) {
            let translator = translatorMgr.find(argAST.type);
            ret = translator.translate(env, paramPrototypeClass, argAST);

            if(generics.isTypeParameter(paramPrototypeClass, paramPrototypeClass.returnType)) {
                let tuple = {};
                tuple[paramPrototypeClass.returnType] = ret[1].name;
                generics.instantiate(paramPrototypeClass, tuple);
            }
           
           return [ret[0], paramPrototypeClass];
    }
    else {
        ret = translatorMgr.findAndTranslate(env, argAST);
        if(paramPrototypeClass.eqType(ret[1])) {
            return ret;
        }
        else {
            throw 'verify method prototype failed' + 
                ', method parameter type: ' + paramPrototypeClass.fullName + 
                ', argument type: ' + ret[1].fullName 
        }
    } 
})

var translateArgsWithMethod = R.curry(function (env, objType, argsAST, method) {
    if(method.parameters.length != argsAST.length) {
        return null;
    }

    let translateArgs = R.pipe( 
        R.prop('parameters'),
        R.zip(argsAST),
        R.map(translateArgWithMethodParams(env, objType))
    );

    try {
        //any error will be thrown , so here only successful result would be return
        let argsRet = translateArgs(method);
        checkNeedDeriveType(method, argsRet);
        return [argsRet, method]
    }
    catch(err) {
        console.log(err);
        return null;
    }
})

var translateArgsAndVerifyMethodsPrototype = function (env, objType, argsAST, methods) {
    let translate = R.pipe(
        R.map(translateArgsWithMethod(env, objType, argsAST)),
        R.filter(x => x != null)
    );

    let ret = translate(methods);
    if(ret.length == 1) {
        return ret[0];
    }
    else {
        throw 'can not found any method prototype for arguments AST'
    }
}

let checkNeedDeriveType = function (method, args) {
    if(!generics.isGenericClass(method)) {
        return;
    }

    let paramTypes = R.map(R.prop('type'), method.parameters);
    let argTypes = R.map(R.nth(1), args);
    let pairs = R.zip(paramTypes, argTypes);

    let T = method.generics.parameters[0];
    let getValueOfType = function (x) {
        return generics.getValueOfTypeParameterFrom(T, x[0], x[1].name);
    };

    let find = R.pipe(
        R.map(getValueOfType),
        R.filter(x=>x!=null),
        R.nth(0)
    )
    let valueOfType = find(pairs);
    let t = {};
    t[T] = valueOfType;
    generics.instantiate(method, t);
}

exports.translate = translate;