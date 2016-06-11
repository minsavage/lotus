/**
 * Created by danney on 16/6/3.
 */
'use strict'
var lotus = require('../lotus');
var codeGenerateUtil = lotus.util.codeGenerateUtil;

class Class {
    constructor() {
        this.name = '';
        this.fields = [];
        this.methods = [];
        this.isPrimitive = false;
        this.translator = null;
    }

    getName() {
        return this.name;
    }

    findField(name) {
        for(var i = 0; i < this.fields.length; ++i) {
            var f = this.fields[i];
            if(f.name == name) {
                return f;
            }
        }
        return null;
    }

    findMethods(name) {

    }

    findMethod(name, parameterTypes) {

    }

    generateVariableDeclaration(objName) {
        return this.translator.generateVariableDeclaration(objName);
    }

    generateProperty(objName, setterNotify) {
        return this.translator.generateProperty(objName, setterNotify);
    }

    generateInitializer(objName, value) {
        return this.translator.generateInitializer(objName, value);
    }
}

module.exports = Class;