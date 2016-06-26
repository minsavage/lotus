/**
 * Created by danney on 16/6/25.
 */
'use strict'

class Class {
    constructor() {
        this.name = '';
        this.fields = [];
        this.methods = [];
        this.superClass = '';
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
}

module.exports = Class;