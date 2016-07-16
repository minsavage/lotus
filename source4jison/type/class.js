/**
 * Created by danney on 16/6/25.
 */
'use strict'
var R = require('ramda');


class Class {
    constructor() {
        this.name = '';
        this.fullName = '';
        this.fields = [];
        this.methods = [];
        this.superClass = '';
        this.import = [];
    }

    addField(field) {
        this.fields.push(field);
    }

    addFields(fields) {
        this.fields = this.fields.concat(fields);
    }

    addMethod(method) {
        this.methods.push(method);
    }

    addMethods(methods) {
        this.methods = this.methods.concat(methods);
    }

    findField(name) {
        return R.find(R.propEq('name', name), this.fields);
    }

    findMethods(name) {
        return R.filter(R.propEq('name', name), this.methods)
    }

    loadType(typeName) {
        let fullName = null; 
        var classLoader = require('./classLoader');

        if(classLoader.isBuiltInType(typeName)) {
            fullName = typeName;
        }
        else {
            fullName = this.findInImport(typeName);
        }

        if(R.isNil(fullName)) {
            let msg = 'can not found [' + typeName + '] in import: ';
            console.log(msg); 
            throw msg;
        }

        let aClass = classLoader.load(fullName);
        let generics = require('../translatorForJavaClass/generics');
        if(generics.isParameterizedGenericClass(typeName)) {
            let ret = generics.parseClassName(typeName);
            aClass = generics.instance(aClass, ret.types);
        }
        return aClass;
    }

    eqType (aClass) {
        //todo: implement extend relationship
        if(aClass.fullName == 'system.type.object' || this.fullName == 'system.type.object') {
            return true;
        }

        if(this.name == aClass.name &&
            this.fullName == aClass.fullName) {
                return true;
        }
        else {
            return false;
        }
    }

    findInImport (typeName) {
        let name = typeName;
        let generics = require('../translatorForJavaClass/generics');
        if(generics.isParameterizedGenericClass(typeName)) {
            let ret = generics.parseClassName(typeName);
            name = ret.name;
        }

        var reg = '^((\\w+|\\$)\\.)?(\\w+\\.)*(item)$'.replace('item', name);
        reg = new RegExp(reg);

        return R.find((x)=>reg.test(x), this.import)
    }
}

module.exports = Class;