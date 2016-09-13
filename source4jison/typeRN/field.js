'use strict'
let R = require('ramda');

class Field {
    constructor() {
        this.name = '';
        this.defaultValue = null;
        this.modifiers = [];
        this.annotations = [];
    }

    static create(name, defaultValue, modifiers, annotations) {
        let field = new Field();
        field.name = name;

        if(!R.isNil(defaultValue)) {
            field.defaultValue = defaultValue;
        }        
        
        if(!R.isNil(modifiers)) {
            field.modifiers = modifiers;
        }

        if(!R.isNil(annotations)) {
            field.annotations = annotations;
        }
        return field;
    }
}

module.exports = Field