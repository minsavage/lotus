/**
 * Created by danney on 16/1/15.
 */
var util = require('util');
var path = require('path');
var mustache = require('mustache');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var variableTypeUtil = lotus.util.variableTypeUtil;
var stringUtil = lotus.util.stringUtil;
var nameUtil = lotus.util.nameUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var projectConfig = lotus.projectConfig;
var modelMgr = lotus.modelMgr;

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
        contentStr += this.buildRemoteQuery(model);
        importStr = this.buildRemoteImport(model);
    }

    return codeGenerateUtil.generateClass(projectConfig.getPackageName(), 'operator', importStr, model.name, contentStr);
}

ModelOperatorBuilder.prototype.buildRemoteQuery = function(model) {
    var resultClassName = nameUtil.getOperatorQueryResultClassName(model.model, model.resultType);
    var resourceObjName = nameUtil.getOperatorQueryResultObjectName(model.model, model.resultType);

    return mustache.render(tpl.modelOperator.remoteQuery, {
        url: projectConfig.getServerDomain(),
        resultClassName: resultClassName,
        resultObjectName: resourceObjName,
        queryFuncName: nameUtil.getOperatorFunctionName('query', model.model, model.resultType)
    });
}

ModelOperatorBuilder.prototype.buildRemoteImport = function(operatorModel) {
    return mustache.render(tpl.modelOperator.remoteImport, {
        modelClassName: stringUtil.firstCharacterToUppercase(operatorModel.model),
        packageName: projectConfig.getPackageName()
    });
}

ModelOperatorBuilder.prototype.buildLocalQueryObject = function(operatorModel) {
    if(util.isNullOrUndefined(operatorModel.action.query)) {
        return '';
    }

    var modelOriginal = modelMgr.queryModel(operatorModel.model);
    if(modelOriginal == null) {
        throw "modelMgr.queryModel failed";
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

    var modelOriginal = modelMgr.queryModel(operatorModel.model);
    if(modelOriginal == null) {
        throw "modelMgr.queryModel failed";
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
        packageName: projectConfig.getPackageName()
    });
}

module.exports = ModelOperatorBuilder;