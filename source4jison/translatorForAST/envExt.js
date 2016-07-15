/**
 * Created by danney on 16/7/1.
 */
'use strict'
var R = require('ramda');
var Class = require('../type/class');
var classLoader = require('../type/classLoader');
var generics = require('../translatorForJavaClass/generics');

var createEnv = R.concat([]);

var add = function (env, local) {
    return R.concat(local, env);
}

var find = function (env, name) {
    var aClass = R.takeLast(1, env)[0];
    if(!(aClass instanceof Class)) {
        throw 'there is no class in env';
    }

    var findInLocal = R.find(R.propEq('name', name));

    var info = null;
    var isFromImport = false;
    var fullType = null;

    do {
        if(classLoader.isBuiltInType(name)) {
            fullType = name;
            break;
        }

        info = findInLocal(env);
        if(!R.isNil(info)) {
            break;
        }

        info = findInClass(name, aClass);
        if(!R.isNil(info)) {
            break;
        }

        fullType = findInImport(name, aClass);
        if(R.isNil(fullType)) {
            return null;
        }
    } while (0);

    if(fullType == null) {
        var type = R.path(['type'], info)
        if(R.isNil(type)) {
            return null;
        }

        if(type instanceof Class) {
            return type;
        }

        if(classLoader.isBuiltInType(type)) {
            fullType = type;
        }
        else {
            fullType = findInImport(type, aClass);
        }
    }

    if(fullType == null) {
        return null;
    }

    return classLoader.load(fullType);
}

var findInClass = function (name, aClass) {
    var findFieldInClass = R.compose(
        R.find(R.propEq('name', name)),
        R.prop('fields')
    );

    var findMethodInClass = R.compose(
        R.find(R.propEq('name', name)),
        R.prop('methods')
    );

    var ret = findFieldInClass(aClass);
    if(R.isNil(ret)) {
        ret = findMethodInClass(aClass);
    }
    return ret;
}



var findInImport = function (typeName, aClass) {
    let name = typeName;
    if(generics.isParameterizedGenericClass(typeName)) {
        var ret = generics.parseClassName(typeName);
        name = ret.name;
    }

    var reg = '^((\\w+|\\$)\\.)?(\\w+\\.)*(item)$'.replace('item', name);
    reg = new RegExp(reg);

    var fullType = R.find((x)=>reg.test(x), aClass.import)
    return fullType;
}

var findMethodReturnType = function (env, methodName, argTypes) {
    let aClass = R.takeLast(1, env)[0];
    if(!(aClass instanceof Class)) {
        throw 'there is no class in env';
    }

    let findMethodInClass = R.compose(
        R.find(R.propEq('name', methodName)),
        R.prop('methods')
    );

    let ret = findMethodInClass(aClass);
    if(R.isNil(ret)) {
        ret = null;
    }
    let type = ret.returnType;

    if(type instanceof Class) {
        return type;
    }

    let fullName = null;
    if(classLoader.isBuiltInType(type)) {
        fullName = type;
    }
    else {
        fullName = findInImport(type, aClass);
    }

    if(fullName == null) {
        return null;
    }
    else {
        return classLoader.load(fullName);
    }
}

exports.createEnv = createEnv;
exports.add = add;
exports.find = find;
exports.findMethodReturnType = findMethodReturnType;