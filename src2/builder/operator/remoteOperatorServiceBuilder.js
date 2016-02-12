/**
 * Created by danney on 17/1/15.
 */
var util = require('util');
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var stringUtil = lotus.util.stringUtil;
var variableTypeUtil = lotus.util.variableTypeUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var modelMgr = lotus.modelMgr;
var ImportRecorder = lotus.recorder.ImportRecorder;


var RemoteOperatorServiceBuilder = function() {
    this._importRecorder = new ImportRecorder();
}

RemoteOperatorServiceBuilder.prototype.parse = function(operators) {
    if(operators.length == 0) {
        return '';
    }

    var result = '';

    for(var k in operators) {
        var operator = operators[k];
        if(operator.accessType != 'remote' || util.isNullOrUndefined(operator.action)) {
            continue;
        }

        this._importRecorder.addModel(operator.model);

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
        packageName: lotus.projectConfig.getPackageName(),
        importModel: this._importRecorder.generate(),
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

module.exports = RemoteOperatorServiceBuilder;