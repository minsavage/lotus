/**
 * Created by danney on 16/1/15.
 */
var util = require('util');
var tpl = require('../template')('./template');
var mustache = require('mustache');
var globalConfig = require('../globalConfig');
var stringUtil = require('../util/stringUtil');
var VariableTypeUtil = require('../util/VariableTypeUtil');
var modelDataMgr = require('../modelDataMgr');
var codeGenerateUtil = require('../util/codeGenerateUtil');

var ModelOperatorBuilder = function() {}

ModelOperatorBuilder.prototype.parse = function(model) {
    var contentStr = '';
    var importStr = '';

    if(model.accessType == 'local') {
        contentStr += this.buildLocalQueryObject(model);
        contentStr += this.buildLocalSaveObject(model);
        importStr = this.buildLocalImport(model);
    }
    else {
        contentStr += this.buildRemoteQueryCollection(model);
        importStr = this.buildRemoteImport(model);
    }

    return codeGenerateUtil.generateClass(globalConfig.packageName, 'operator', importStr, model.name, contentStr);
}

ModelOperatorBuilder.prototype.buildRemoteQueryCollection = function(model) {
    var parameters = model.action.query.parameters;
    var parameterStr = '';
    for(var name in parameters) {
        var para = parameters[name];
        var javaType = VariableTypeUtil.getType(para.type);
        parameterStr += javaType + ' ' + name + ', ';
    }

    return mustache.render(tpl.modelOperator.remoteQueryCollection, {
        parameters: parameterStr,
        url: globalConfig.serverUrl,
        modelClassName: stringUtil.firstCharacterToUppercase(model.model),
        modelObjName: stringUtil.firstCharacterToLowercase(model.model)
    });
}

ModelOperatorBuilder.prototype.buildRemoteImport = function(operatorModel) {
    return mustache.render(tpl.modelOperator.remoteImport, {
        modelClassName: stringUtil.firstCharacterToUppercase(operatorModel.model),
        packageName: globalConfig.packageName
    });
}

ModelOperatorBuilder.prototype.buildLocalQueryObject = function(operatorModel) {
    if(util.isNullOrUndefined(operatorModel.action.query)) {
        return '';
    }

    var modelOriginal = modelDataMgr.queryModel(operatorModel.model);
    if(modelOriginal == null) {
        throw "modelDataMgr.queryModel failed";
    }

    var assignmentStr = '';
    var properties = modelOriginal.properties;
    for(var k in properties) {
        var property = properties[k];
        var objName = stringUtil.firstCharacterToLowercase(modelOriginal.name);
        var value = codeGenerateUtil.generateSPGetter('sp', property.type, property.name);
        value = value.substr(0, value.length-1); // 去掉分号
        assignmentStr += codeGenerateUtil.generateSetterCall(objName, property.name, value) + '\r';
    }

    return mustache.render(tpl.modelOperator.localQueryObject, {
        modelClassName: stringUtil.firstCharacterToUppercase(operatorModel.model),
        modelObjName: stringUtil.firstCharacterToLowercase(operatorModel.model),
        operatorClassName: operatorModel.name,
        assignment: assignmentStr
    });
}

ModelOperatorBuilder.prototype.buildLocalSaveObject = function(operatorModel) {
    if(util.isNullOrUndefined(operatorModel.action.save)) {
        return '';
    }

    var modelOriginal = modelDataMgr.queryModel(operatorModel.model);
    if(modelOriginal == null) {
        throw "modelDataMgr.queryModel failed";
    }

    var assignmentStr = '';
    var properties = modelOriginal.properties;
    for(var k in properties) {
        var property = properties[k];
        var objName = stringUtil.firstCharacterToLowercase(modelOriginal.name);
        var value = codeGenerateUtil.generateGetterCall(objName, property.name);
        value = value.substr(0, value.length-1); // 去掉分号
        assignmentStr += codeGenerateUtil.generateSPSetter('sp', property.type, property.name, value) + '\r';
    }

    return mustache.render(tpl.modelOperator.localSaveObject, {
        modelClassName: stringUtil.firstCharacterToUppercase(operatorModel.model),
        modelObjName: stringUtil.firstCharacterToLowercase(operatorModel.model),
        operatorClassName: operatorModel.name,
        assignment: assignmentStr
    });
}

ModelOperatorBuilder.prototype.buildLocalImport = function(operatorModel) {
    return mustache.render(tpl.modelOperator.localImport, {
        modelClassName: stringUtil.firstCharacterToUppercase(operatorModel.model),
        packageName: globalConfig.packageName
    });
}

module.exports = ModelOperatorBuilder;