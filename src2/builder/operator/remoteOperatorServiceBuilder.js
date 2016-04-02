/**
 * Created by danney on 17/1/15.
 */
var util = require('util');
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var stringUtil = lotus.util.stringUtil;
var nameUtil = lotus.util.nameUtil;
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

            result += generateAnnotation(actionName, operator.model, operator.resultType, action.method, action.url) + '\r';
            result += generateGet(operator.model, operator.resultType, action.method, hasParameter, action.parameterType) + '\r\r';
        }
    }

    return mustache.render(tpl.modelOperator.remoteOperatorService, {
        packageName: lotus.projectConfig.getPackageName(),
        importModel: this._importRecorder.generate(),
        content: result.trim()
    });
}

var generateAnnotation = function(action, model, resultType, method, url) {
    if(!stringUtil.isNotEmpty(url)) {
        url = '/' + nameUtil.getOperatorQueryResultObjectName(model, resultType);
    }

    var methodName = '';
    if(stringUtil.isNotEmpty(method)) {
        methodName = getMethodName(method);
    }

    if(action == 'query') {
        var template = '@{{method}}("{{url}}")';
        return mustache.render(template, {
            method: methodName,
            url: url
        });
    }
    else {
        throw 'not implemented action: ' + action;
    }
}

var generateGet = function(modelName, resultType, method, hasParameter, paramType) {
    var functionName = nameUtil.getOperatorFunctionName('query', modelName, resultType);

    var resourceName = '';
    if(resultType == 'collection') {
        resourceName = 'Collection<' + modelName + '>';
    }
    else {
        resourceName = modelName;
    }

    var parameter = '';
    if(hasParameter) {
        var annotation = getParameterAnnotation(method, paramType);
        parameter = annotation + ' Map<String, Object> parameters';
    }

    var template = 'Call<{{retType}}> {{funcName}}({{param}});';

    return mustache.render(template, {
        retType: resourceName,
        funcName: functionName,
        param: parameter
    })
}

var getMethodName = function(method) {
    if(method == 'get') {
        return 'GET'
    }
    else if(method == 'post') {
        return 'POST'
    }
    else {
        throw 'getMethodName error, not implement: ' + method
    }
}

var getParameterAnnotation = function(method, paramType) {
    if(!stringUtil.isNotEmpty(method)) {
        method = 'get';
    }

    if(method == 'get') {
        return '@QueryMap';
    }
    else if(method == 'post') {
        if(paramType == 'formUrlEncoded') {
            return '@FieldMap'
        }
        else {
            return '@Body'
        }
    }
}

module.exports = RemoteOperatorServiceBuilder;