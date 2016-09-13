'use strict'
let R = require('ramda');
let Field = require('./field');
let Method = require('./method');

class Class {
    constructor() {
        this.fullName = null;
        this.fields = [];
        this.methods = [];
        this.superClass = null;
        this.import = null;
        this.importNative = null;
        this.annotations = [];
        this.modifiers = [];
    }

    static create(name, fields, methods, importLines, superClass, 
        modifiers, annotations, importNativeLines) {
        let aClass = new Class();
        aClass.name = name;
        
        if(!R.isNil(superClass)) {
            aClass.superClass = superClass;
        }

        if(fields instanceof Array) {
            aClass.fields = fields
        }

        if(methods instanceof Array) {
            aClass.methods = methods;
        }

        if(importLines instanceof Array) {
            aClass.import = importLines;
        }

        if(importNativeLines instanceof Array) {
            aClass.importNative = importNativeLines;
        }

        if(modifiers instanceof Array) {
            aClass.modifiers = modifiers;
        }

        if(annotations instanceof Array) {
            aClass.annotations = annotations;
        }
        
        return aClass;
    }

    getName() {
        return this.name;
    }

    getFullName() {
        return this.fullName;
    }

    getField(name) {
        return R.find(R.propEq('name', name), this.fields);
    }

    getMethods(name) {
        let methods = R.filter(R.propEq('name', name), this.methods);
        if(!R.isNil(this.superClass) && this.superClass != '') {
            let methodsInSuper = this.getMethodsInSuper(name);
            if(!R.isNil(methodsInSuper)) {
                methods = methods.concat(methodsInSuper)
            }
        }
        return methods;
    }

    getMethodsInSuper(name) {
        let superType = this.loadType(this.superClass);
        return superType.findMethods(name);
    }
}

module.exports = Class;