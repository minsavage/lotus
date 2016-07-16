'use strict'
var R = require('ramda');
var mustache = require('mustache');
var Method = require('../type/method');

var instance = function (aClass, instanceTypes) {
    let startInstance = R.pipe(
        R.zip(aClass.generics.parameters),
        R.filter(x=>x[0]!=x[1]),
        R.map(instanceOne(aClass))
    );

    let mapToInstanceTypes = function(type, index){
        let instanceType = instanceTypes[index]
        if(R.isNil(instanceType)) {
            return type;
        }
        else {
            return instanceType;
        }
    };

    let getInstancedClassName = R.pipe(
        R.path(['generics', 'parameters']),
        R.addIndex(R.map)(mapToInstanceTypes),
        R.join(', '),
        R.of,
        R.map(x=>aClass.name + '<'+ x + '>'),
        R.join('')
    )

    startInstance(instanceTypes);
    aClass.name = getInstancedClassName(aClass);
    return aClass;
}

var instanceOne = R.curry(function (aClass, genericsInfo) {
    let genericsType = genericsInfo[0];
    let instanceType = genericsInfo[1]; 

    let mapField = function (field) {
        if(isGenericsType(field.type, genericsType)) {
            field.type = getInstanceType(genericsType, instanceType);
        }
    }

    let instanceFileds = R.compose(R.map(mapField), R.prop('fields'));

    let mapMethod = function (method) {
        if(isGenericsType(method.returnType, genericsType)) {
            method.returnType = getInstanceType(method.returnType, genericsType, instanceType);
        }

        let mapParams = function (arg) {
            if(isGenericsType(arg.type, genericsType)) {
                arg.type = getInstanceType(arg.type, genericsType, instanceType);
            }
            return arg;
        }

        R.map(mapParams, method.parameters);
    }

    let instanceMethods = R.compose(R.map(mapMethod), R.prop('methods'));

    if(aClass instanceof Method) {
        mapMethod(aClass);
    }
    else {
        instanceFileds(aClass);
        instanceMethods(aClass);
    }
});

var isGenericsType = function (type, genericsType) {
    if(type == genericsType) {
        return true;
    }

    let reg = /^\w+<(\w+(\s*,\s*\w+)*)>$/g;
    if(!reg.test(type)) {
        return false;
    }

    let findType = R.compose(R.filter(x=>x==genericsType), R.split(','));
    let typesInArray = findType(RegExp.$1);
    if(typesInArray.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

var getInstanceType = function(type, genericsType, instanceType) {
    if(type == genericsType) {
        return instanceType;
    }

    let reg = /^(\w+)<(\w+(\s*,\s*\w+)*)>$/g;
    if(!reg.test(type)) {
        throw 'can not found generics type: ' + type;
    }

    var getTypeInGenericsClass = R.pipe(
        R.split(','),
        R.map((x)=>x == genericsType ? instanceType : x),
        R.join(', '),
        R.of,
        R.map((x)=>{
            let tpl = '{{class}}<{{type}}>'
            return mustache.render(tpl, {
                class: RegExp.$1,
                type: x
            })
        }),
        R.join('')
    );

    return getTypeInGenericsClass(RegExp.$2);
}

var isParameterizedGenericClass = function (name) {
    let reg = /^(\w+)<(\w+(\s*,\s*\w+)*)>$/g;
    if(reg.test(name)) {
        return true;
    }
    else {
        return false;
    }
}

var parseClassName  = function(name) {
    let reg = /^(\w+)<(\w+(\s*,\s*\w+)*)>$/g;
    if(!reg.test(name)) {
        throw 'can not found generic types: ' + name;
    }

    return {
        name: RegExp.$1,
        types: R.map(R.trim, R.split(',', RegExp.$2))
    }
}

exports.instance = instance;
exports.isParameterizedGenericClass = isParameterizedGenericClass;
exports.parseClassName = parseClassName;