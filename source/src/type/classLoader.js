/**
 * Created by danney on 16/6/3.
 */
'use strict'
var Class = require('./class');
var TemplateClass = require('./templateClass');
var Field = require('./field');
var ImportLoader = require('./importLoader');
var util = require('util');
var ReferenceTypeTranslator = require('./referenceTypeTranslator');

class ClassLoader {
    static load(model, templateTypes) {
        var classMgr = ImportLoader.load(model.import);
        var c = null;

        if(!util.isNullOrUndefined(model.templateClass)) {
            c = new TemplateClass();
            c.tSize = model.templateClass.size;
        }
        else {
            c = new Class();
        }


        c.name = model.name;

        if(util.isNullOrUndefined(model.translator)) {
            c.translator = new ReferenceTypeTranslator();
            c.translator.nativeName = c.name;
        }
        else {
            c.translator = new model.translator();
        }

        for(var k in model.properties) {
            var p = model.properties[k];

            var type = classMgr.find(p.type);
            if(util.isNullOrUndefined(type)) {
                throw 'can not find the type: ' + p.type;
            }

            var field = new Field();
            field.name = p.name;
            field.type = type;
            field.defaultValue = p.defaultValue;
            c.fields.push(field);
        }
        return c;
    }
}

module.exports = ClassLoader;