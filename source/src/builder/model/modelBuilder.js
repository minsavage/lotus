/**
 * Created by danney on 16/1/15.
 */
"use strict";

var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var projectConfig = lotus.projectConfig;
var BaseBuilder = require('../baseBuilder');
var util = require('util');

var R = require('ramda');

class ModelBuilder extends BaseBuilder {
    parse(model) {
        super.parse(model);

        var result = this.buildProperties(model.properties);

        return codeGenerateUtil.generateClass(projectConfig.getPackageName(),
            'model',
            this.importRecorder.generate(),
            model.name,
            result.trim());
    }

    buildProperties(properties) {
        var result = '';
        for(var k in  properties) {
            var p = properties[k];
            result += this.buildProperty(p);
        }
        return result;
    }

    buildProperty(property) {
        var c = this.classMgr.find(property.type);
        if(util.isNullOrUndefined(c)) {
            throw 'can not supported type [' + property.type + '] , do you forget import it ?';
        }

        return c.generateProperty(property.name);
    }
}

module.exports = ModelBuilder;

