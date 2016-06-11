/**
 * Created by danney on 16/6/8.
 */
'use strict'
var TypeTranslator = require('../primitiveTypeTranslator');

class BoolTranslator extends TypeTranslator {
    constructor() {
        super();
        this.nativeName = 'Boolean';
    }
}

module.exports = BoolTranslator;