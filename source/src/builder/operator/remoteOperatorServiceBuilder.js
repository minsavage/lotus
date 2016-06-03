/**
 * Created by danney on 17/1/15.
 */
'use strict';
var util = require('util');
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var stringUtil = lotus.util.stringUtil;
var nameUtil = lotus.util.nameUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var modelMgr = lotus.modelMgr;
var BaseBuilder = require('../baseBuilder');

class RemoteOperatorServiceBuilder extends BaseBuilder {
    parse(operators) {
        super.parse(operators);

        var content = '';
        for(var k in operators) {
            content += this.parseOperator(operators[k]);
        }

        return mustache.render(tpl.modelOperator.remoteOperatorService, {
            packageName: lotus.projectConfig.getPackageName(),
            importModel: this.importRecorder.generate(),
            content: content.trim()
        });
    }

    parseOperator(operator) {
        var result = '';
        for(var actionName in operator.action) {
            var action = operator.action[actionName];
            var isCollection = (action.resultType == 'collection') ? true: false;
            var hasParameter = false;
            if(!util.isNullOrUndefined(action.parameters)) {
                hasParameter = true;
            }

            result += generateAnnotation(actionName,
                                            operator.operatedModel,
                                            action.resultType,
                                            action.method,
                                            action.url) + '\r';

            result += generateGet(operator.operatedModel,
                                    action.resultType,
                                    action.method,
                                    hasParameter,
                                    action.parameterType) + '\r\r';
        }

        this.importRecorder.add(operator.import);

        return result;
    }

    check(operators) {
        if(!util.isArray(operators) || operators.length < 1) {
            throw 'RemoteOperatorServiceBuilder: parse() need a array and length > 1'
        }
    }
}

var generateAnnotation = function(action, model, resultType, method, url) {
    if(!stringUtil.isNotEmpty(url)) {
        url = '/' + nameUtil.getOperatorQueryResultObjectName(model, resultType);
    }

    var methodName = '';
    if(!stringUtil.isNotEmpty(method)) {
        method = 'get';
    }
    methodName = getMethodName(method);

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

    var template = 'Observable<{{retType}}> {{funcName}}({{param}});';

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