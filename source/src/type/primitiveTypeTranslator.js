/**
 * Created by danney on 16/6/8.
 */
'use strict'
var TypeTranslator = require('./typeTranslator');

class PrimitiveTypeTranslator extends TypeTranslator {
    generateInitializer(name, value) {
        return name + ' = ' + value + ';\r';
    }
}

module.exports = PrimitiveTypeTranslator;