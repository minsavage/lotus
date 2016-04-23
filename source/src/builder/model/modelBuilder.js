/**
 * Created by danney on 16/1/15.
 */
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var projectConfig = lotus.projectConfig;
var ImportRecorder = lotus.recorder.ImportRecorder;
var variableTypeUtil = lotus.util.variableTypeUtil;
var importUtil = lotus.util.importUtil;

var ModelBuilder = function() {}

ModelBuilder.prototype.parse = function(model) {
    if(model.name == undefined || model.name == null) {
        console.log('model.name == null');
        return;
    }

    var importRecorder = new ImportRecorder();
    var properties = model.properties;

    importUtil.fill(importRecorder, model.import);

    var result = '';
    for(var k in  properties) {
        var p = properties[k];
        var name = p.name;
        var type = p.type;

        var ret = '';
        ret += codeGenerateUtil.generateMemberVariable(type, name) + '\r\r';
        ret += codeGenerateUtil.generateGetter(type, name) + '\r\r';
        ret += codeGenerateUtil.generateSetter(type, name) + '\r\r';

        if(variableTypeUtil.isModel(type)) {
            importRecorder.addModel(type);
        }
        else {
            var importStr = variableTypeUtil.queryImport(type);
            if(lotus.util.stringUtil.isNotEmpty(importStr)) {
                importRecorder.addPlain(importStr);
            }
        }

        result += ret;
    }

    return codeGenerateUtil.generateClass(projectConfig.getPackageName(), 'model', importRecorder.generate(), model.name, result.trim());
}

module.exports = ModelBuilder;