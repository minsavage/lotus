/**
 * Created by danney on 16/7/1.
 */
'use strict'
var R = require('ramda');
var Class = require('../type/class');
var classLoader = require('../type/classLoader');
var generics = require('../translator/generics');

var createEnv = R.concat([]);

var add = function (env, local) {
    return R.concat(local, env);
}

var find = function (env, name) {
    if(classLoader.isBuiltInType(name)) {
        return classLoader.load(name);
    }

    let aClass = R.takeLast(1, env)[0];
    if(!(aClass instanceof Class)) {
        throw 'there is no class in env';
    }

    let type = null;

    do {
        //find in local scope
        let ret = R.find(R.propEq('name', name), env); 
        type = R.path(['type'], ret)
        if(!R.isNil(type)) {
            break;
        }

        ret = findInClass(name, aClass);
        type = R.path(['type'], ret)
        if(!R.isNil(type)) {
            break;
        }

        // maybe 'name' is a type Name , not a variable name 
        type = name;
    } while (0);

    if(type instanceof Class) {
        return type;
    }

    return aClass.loadType(type);
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
        let aClass = classLoader.load(fullName);
        if(generics.isParameterizedClassName(type)) {
            let ret = generics.parseClassName(type);
            aClass = generics.instantiate(aClass, ret.types);
        }
        return aClass;
    }
}

exports.createEnv = createEnv;
exports.add = add;
exports.find = find;
exports.findMethodReturnType = findMethodReturnType;