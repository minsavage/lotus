/**
 * Created by danney on 16/6/8.
 */
'use strict'
var TypeTranslator = require('./typeTranslator');

class ReferenceTypeTranslator extends TypeTranslator {
    generateInitializer(objName, value) {
        return objName + ' = new ' + this.getNativeName() + '();';
    }
}

module.exports = ReferenceTypeTranslator;