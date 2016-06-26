/**
 * Created by danney on 16/6/25.
 */
'use strict'

class Class {
    constructor() {
        this.name = '';
        this.fields = [];
        this.methods = [];
    }

    addField(field) {
        this.fields.push(field);
    }

    addFields(fields) {
        this.fields = this.fields.concat(fields);
    }
}

module.exports = Class;