/**
 * Created by danney on 16/4/18.
 */

//var path = require('path');
//var lotus = require('../../lotus');
//var tpl = lotus.template(path.resolve(__dirname, '../template'));
//var codeGenerateUtil = lotus.util.codeGenerateUtil;
//var projectConfig = lotus.projectConfig;
//var ImportRecorder = lotus.recorder.ImportRecorder;
//var variableTypeUtil = lotus.util.variableTypeUtil;
//var importUtil = lotus.util.importUtil;

import Builder from './builder';

class ModelBuilder extends Builder{
    parse(model) {
        var ret = buildProperties(model.properties);
        return codeGenerateUtil.generateClass(projectConfig.getPackageName(), 'model', importRecorder.generate(), model.name, ret.trim());
    }

    buildProperties(properties) {
        var result = '';
        for(var k in  properties) {
            var p = properties[k];
            var name = p.name;
            var type = p.type;

            var ret = '';
            ret += codeGenerateUtil.generateMemberVariable(type, name) + '\r\r';
            ret += codeGenerateUtil.generateGetter(type, name) + '\r\r';
            ret += codeGenerateUtil.generateSetter(type, name) + '\r\r';
            result += ret;
        }
        return result;
    }

    check() {

    }
}