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
            result += this.buildProperty(p.name, p.type);
        }
        return result;
    }

    buildProperty(name, type) {
        var ret = '';
        ret += codeGenerateUtil.generateMemberVariable(type, name) + '\r\r';
        ret += codeGenerateUtil.generateGetter(type, name) + '\r\r';
        ret += codeGenerateUtil.generateSetter(type, name) + '\r\r';
        return ret;
    }
}

module.exports = ModelBuilder;