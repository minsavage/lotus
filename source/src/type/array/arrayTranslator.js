/**
 * Created by danney on 16/6/8.
 */
'use strict'
var mustache = require('mustache');
var util = require('util');
var TemplateTypeTranslator = require('../templateTypeTranslator');

class ArrayTranslator extends TemplateTypeTranslator {
    constructor() {
        super();
        this.nativeName = 'ArrayList';
    }

    getNativeName() {
        var t = this.tList[0];
        return this.nativeName + '<' + t.translator.getNativeName() + '>';
    }

    generateInitializer(objName, value) {
        var code = '';
        if(util.isArray(value)) {
            code = super.generateInitializer(objName, value);
        }

        var tpl = '{{name}}.add({{value}})';
        for(var k in value) {
            var item = value[k];
            code += mustache.render(tpl, {
                name: objName,
                value: item
            }) + '\r';
        }
        return code;
    }
}

module.exports = ArrayTranslator;