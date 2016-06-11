/**
 * Created by danney on 16/6/8.
 */
'use strict'
var TypeTranslator = require('../primitiveTypeTranslator');

class IntTranslator extends TypeTranslator {
    constructor() {
        super();
        this.nativeName = 'Integer';
    }
}

module.exports = IntTranslator;