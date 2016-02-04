/**
 * Created by danney on 17/1/15.
 */
var util = require('util');
var mustache = require('mustache');
var tpl = require('../template')('./template');
var globalConfig = require('../globalConfig');
var stringUtil = require('../util/stringUtil');
var VariableTypeUtil = require('../util/VariableTypeUtil');
var modelDataMgr = require('../modelDataMgr');
var codeGenerateUtil = require('../util/codeGenerateUtil');


var RemoteOperatorServiceBuilder = function() {}

RemoteOperatorServiceBuilder.prototype.parse = function(operators) {
    if(operators.length == 0) {
        return '';
    }

    var result = '';
    var importRecorder = [];

    for(var k in operators) {
        var operator = operators[k];
        if(operator.accessType != 'remote' || util.isNullOrUndefined(operator.action)) {
            continue;
        }

        importRecorder.push(operator.model);

        for(var actionName in operator.action) {
            var action = operator.action[actionName];
            var isCollection = (operator.resultType == 'collection') ? true: false;
            var hasParameter = false;
            if(!util.isNullOrUndefined(action.parameters)) {
                hasParameter = true;
            }

            result += generateAnnotation(actionName, operator.model, isCollection) + '\r';
            result += generateGet(operator.model, isCollection, hasParameter) + '\r\r';
        }
    }

    return mustache.render(tpl.modelOperator.remoteOperatorService, {
        packageName: globalConfig.packageName,
        importModel: generateImport(importRecorder),
        content: result.trim()
    });
}

var generateAnnotation = function(action, model, isCollection) {
    if(action == 'query') {
        var name = isCollection ? (model + 's') : model;
        return '@GET("/' + stringUtil.firstCharacterToLowercase(name) + '")';
    }
}

var generateGet = function(modelName, isCollection, hasParameter) {
    var returnType = '';
    var functionName = '';
    if(isCollection) {
        returnType = 'Collection<' + modelName + '>';
        functionName = modelName + 's';
    }
    else {
        returnType = modelName;
        functionName = modelName;
    }

    var parameter = '';
    if(hasParameter) {
        parameter = '@QueryMap Map<String, String> options'
    }

    return 'Call<' + returnType + '> get' + functionName + '(' + parameter + ');'
}

var generateImport = function(modelList) {
    var result = '';
    for(var k in modelList) {
        var name =  modelList[k];
        result += 'import ' + globalConfig.packageName + '.model.' + name + ';\r';
    }
    return result;
}

module.exports = RemoteOperatorServiceBuilder;