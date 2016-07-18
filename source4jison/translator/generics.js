'use strict'
var R = require('ramda');
var mustache = require('mustache');
var Method = require('../type/method');
var Class = require('../type/class');
var FuncSignature = require('../type/funcSignature');

let genericReg = '^(\\w+)<(.+(\\s*,\\s*.+)*)>$';

let instantiate = function(aClass, instantiatedTypes) {
    let pairs = null;
    let type = R.type(instantiatedTypes);
    if(type == 'Array') {
        pairs = makePair(aClass, instantiatedTypes);
        let values = R.fromPairs(pairs);
        aClass.generics.values = R.merge(aClass.generics.values, values);
    }
    else if(type == 'Object') {
        pairs = R.toPairs(instantiatedTypes)
        aClass.generics.values = R.merge(aClass.generics.values, instantiatedTypes);
    }
    else {
        throw 'do not supported type: ' + type;
    }

    R.map(instanceOne(aClass), pairs);
    
    if(!(aClass instanceof Method)) {
        aClass.name = getParameterizedClassName(aClass);
    }
    return aClass;
}

let isGenericClass = function(aClass) {
    let params = R.path(['generics', 'parameters'])(aClass);
    if(R.isNil(params)) {
        return false;
    }
    else {
        return true;
    }
}

let isParameterizedClassName = function(name) {
    let reg = new RegExp(genericReg);
    return reg.test(name);
}

let isTypeParameter = function(aClass, type) {
    if(!isGenericClass(aClass)) {
        return false;
    }

    let find = R.pipe(
        R.path(['generics', 'parameters']),
        R.find(R.equals(type))
    )

    if(R.isNil(find(aClass))) {
        return false;
    }
    else {
        return true;
    }
}

var isGenericType = R.curry(function (genericType, type) {
    if(genericType == type) {
        return true;
    }

    let reg = new RegExp(genericReg);
    if(!reg.test(type)) {
        return false;
    }

    let testNested = R.compose(
        R.not,
        R.isNil,
        R.find(R.equals(genericType)),
        R.map(R.trim), 
        R.split(',')
    );
    let v = RegExp.$1;
    let ret = testNested(RegExp.$2);
    return ret;
});

let makePair = function(aClass, instantiatedTypes) {
    let make = R.pipe(
        R.zip(aClass.generics.parameters),
        R.filter(x=>x[0]!=x[1])
    );
    return make(instantiatedTypes);
}

var instanceOne = R.curry(function (aClass, genericsInfo) {
    let k = genericsInfo[0];
    let v = genericsInfo[1]; 

    let isGenericTypeWithK = isGenericType(k);
    let instantiateTypeWithKV = instantiateType(k, v);

    let mapField = function (field) {
        if(isGenericTypeWithK(field.type)) {
            field.type = instantiateTypeWithKV(field.type);
        }
    }

    let mapMethod = function (method) {
        if(isGenericTypeWithK(method.returnType)) {
            method.returnType = instantiateTypeWithKV(method.returnType);
        }

        let mapParams = function (arg) {
            if(isGenericTypeWithK(arg.type)) {
                arg.type = instantiateTypeWithKV(arg.type);
            }
            return arg;
        }

        R.map(mapParams, method.parameters);
    }

    let instantiateFileds = R.compose(R.map(mapField), R.prop('fields'));
    let instantiateMethods = R.compose(R.map(mapMethod), R.prop('methods'));

    if(aClass instanceof Method || aClass instanceof FuncSignature) {
        mapMethod(aClass);
    }
    else {
        instantiateFileds(aClass);
        instantiateMethods(aClass);
    }
});

let instantiateType = R.curry(function(genericType, instantiatedType, type) {
    if(type == genericType) {
        return instantiatedType;
    }

    let reg = new RegExp(genericReg);
    if(!reg.test(type)) {
        throw 'can not found generic type: ' + type;
    }

    let getInNested = R.pipe(
        R.split(','),
        R.map(R.trim),
        R.map((x)=>x == genericType ? instantiatedType : x),
        getParameterizedName(RegExp.$1)
    );

    return getInNested(RegExp.$2);
});

let getParameterizedName = R.curry(function(name, types) {
    let get = R.pipe(
        R.join(', '),
        x => name + '<' + x + '>'
    )
    return get(types);
})

let getParameterizedClassName = function (aClass, name) {
    let getInstantiatedType = function(typeParam) {
        let ret = R.path(['generics', 'values', typeParam])(aClass);
        return R.isNil(ret) ? typeParam: ret;
    }

    let getTypes = R.pipe(
        R.path(['generics', 'parameters']),
        R.map(getInstantiatedType)
    );

    return getParameterizedName(aClass.generics.name, getTypes(aClass));
}

var parseClassName  = function(name) {
    let reg = new RegExp(genericReg);
    if(!reg.test(name)) {
        throw 'can not found generic types: ' + name;
    }

    return {
        name: RegExp.$1,
        types: R.map(R.trim, R.split(',', RegExp.$2))
    }
}

let getValueOfTypeParameterFrom = function (typeParam, genericType, parameterizedType) {
    if(typeParam == genericType) {
        return parameterizedType;
    }

    //let reg = /^(\w+)<(\w+(\s*,\s*\w+)*)>$/;
    //todo ：这里貌似有一些问题，如果嵌套更深的泛型会不会有问题？
    let reg = new RegExp(genericReg);
    if(!reg.test(parameterizedType)) {
        return null;
    }
    let types = R.split(',', RegExp.$2);
    types = R.map(R.trim, types);

    if(!reg.test(genericType)) {
        return null;
    }

    let getInNested = R.pipe(
        R.split(','),
        R.map(R.trim),
        R.findIndex(R.equals(typeParam)),
        R.nth(R.__, types)
    );
    return getInNested(RegExp.$2);
}


exports.instantiate = instantiate;
exports.isGenericClass = isGenericClass;
exports.isTypeParameter = isTypeParameter;
exports.isParameterizedClassName = isParameterizedClassName;
exports.parseClassName = parseClassName;
exports.getValueOfTypeParameterFrom = getValueOfTypeParameterFrom;