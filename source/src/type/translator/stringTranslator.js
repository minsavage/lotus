/**
 * Created by danney on 16/6/8.
 */
'use strict'
var TypeTranslator = require('../primitiveTypeTranslator');

class StringTranslator extends TypeTranslator {
    constructor() {
        super();
        this.nativeName = 'String';
    }
}

module.exports = StringTranslator;