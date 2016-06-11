/**
 * Created by danney on 16/6/11.
 */
'use strict'
var util = require('util');

class CodeTranslatorEnv {
    constructor() {
        this.localScope = {};
        this.thisScope = {};
    }

    find(name) {
        var ret = this.localScope[name];
        if(!util.isNullOrUndefined(ret)) {
            return ret;
        }

        return this.findInThis(name);
    }

    findInThis(name) {
        return this.thisScope[name];
    }

    add(name, field, isLocal) {
        if(isLocal) {
            this.localScope[name] = field;
        }
        else {
            this.thisScope[name] = field;
        }
    }
}

module.exports = CodeTranslatorEnv;