/**
 * Created by danney on 16/6/8.
 */
'use strict'
var ReferenceTypeTranslator = require('./referenceTypeTranslator');

class TemplateTypeTranslator extends ReferenceTypeTranslator {
    constructor() {
        super();
        this.tSize = 0;
        this.tList = [];
    }
}

module.exports = ReferenceTypeTranslator;