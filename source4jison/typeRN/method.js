'use strict'
let R = require('ramda');

class Method {
    constructor() {
        this.parameters = [];
        this.annotations = [];
        this.body = '';
    }

    static create(name, params, body, annotations) {
        let method = new Method();
        method.name = name;
        method.body = body;

        if(params instanceof Array) {
            method.parameters = params;
        }

        if(annotations instanceof Array) {
            method.annotations = annotations;
        }
        return method;
    }
}

module.exports = Method;