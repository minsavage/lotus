/**
 * Created by danney on 16/6/25.
 */
'use strict'

class Method {
    constructor() {
        this.name = '';
        this.returnType = null;
        this.parameters = [];
        this.annotations = [];
        this.body = '';
        this.modifiers = [];
    }
}

module.exports = Method;