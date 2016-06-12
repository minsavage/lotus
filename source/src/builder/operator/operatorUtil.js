/**
 * Created by danney on 16/6/12.
 */
var util = require('util');
var mustache = require('mustache');
var lotus = require('../../lotus');
var nameUtil = lotus.util.nameUtil;
var stringUtil = lotus.util.stringUtil;
var variableTypeUtil = lotus.util.variableTypeUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var objectUtil = lotus.util.objectUtil;

var generateMethod = function(actionModel) {
    var parasContainer = {
        path: [],
        queryMap: [],
        json: []
    }

    if(util.isNullOrUndefined(actionModel.method)) {
        actionModel.method = 'get';
    }

    var paras = actionModel.parameters;
    for(var i = 0; i < paras.length; i++) {
        var para = paras[i];
        var retrofitType = para.retrofitType;
        var container = parasContainer[retrofitType];
        if(util.isNullOrUndefined(container)) {
            throw 'do not supported retrofit type: ' + retrofitType
        }
        container.push(para);
    }

    var name = nameUtil.getOperatorFunctionName('query', actionModel.responseType);
    var returnType = 'Observable<' + actionModel.responseType + '>';
    var annotation = generateAnnotation(
        'query',
        actionModel.responseType,
        actionModel.method,
        actionModel.url
    );

    var annotations = [annotation];

    var parameters = [];

    if(parasContainer.path.length > 0) {
        for(var i = 0; i < parasContainer.path.length; i++) {
            var para = parasContainer.path[i];

            var parameter = {
                name: para.name,
                type: para.type,
                annotations: ['@Path("' + para.name +'")']
            };

            parameters.push(parameter);
        }
    }

    if(actionModel.method == 'get' && parasContainer.queryMap.length > 0) {
        var parameter = {
            name: 'parameters',
            type: 'Map<String, Object>',
            annotations: ['@QueryMap']
        };

        parameters.push(parameter);
    }

    if(actionModel.method == 'post' && parasContainer.json.length > 0) {
        var parameter = {
            name: 'parameters',
            type: 'Map<String, Object>',
            annotations: ['@Body']
        };

        parameters.push(parameter);
    }
    return {
        name: name,
        parameters: parameters,
        returnType: returnType,
        annotations: annotations
    }
}

var generateMethodCode = function(methodModel, withAnnotation) {
    var methodCode = '';

    if(withAnnotation == true && util.isArray(methodModel.annotations) && methodModel.annotations.length > 0) {
        for(var i = 0; i < methodModel.annotations.length; i++) {
            methodCode += methodModel.annotations[i] + '\r';
        }
    }

    var parasCode = '';
    if(util.isArray(methodModel.parameters) && methodModel.parameters.length > 0) {
        for(var i = 0; i < methodModel.parameters.length; i++) {
            var para = methodModel.parameters[i];

            var code = '';
            var annotationsCode = ''
            if(withAnnotation == true && util.isArray(para.annotations) && para.annotations.length > 0) {
                for(var i = 0; i < para.annotations.length; i++) {
                    annotationsCode += para.annotations[i] + ' ';
                }
            }

            code = annotationsCode + variableTypeUtil.getType(para.type) + ' ' + para.name;
            parasCode = code + ', ';
        }

        parasCode = stringUtil.withoutSuffix(parasCode, ", ");
    }

    var template = '{{returnType}} {{funcName}}({{param}})';
    methodCode += mustache.render(template, {
        returnType:methodModel.returnType,
        funcName: methodModel.name,
        param: parasCode
    })

    return methodCode;
}

var generateMethodCallCodeWithSameArgument = function(methodModel) {
    var paraCode = '';
    if(util.isArray(methodModel.parameters)) {
        for(var i = 0; i < methodModel.parameters.length; i++) {
            var para = methodModel.parameters[i];
            paraCode += para.name + ', ';
        }

        paraCode = stringUtil.withoutSuffix(paraCode, ', ');
    }

    return methodModel.name + '(' + paraCode + ')';
}

var generateMethodCallCode = function(methodModel, arguments) {
    var paraCode = '';
    if(util.isArray(methodModel.parameters)) {
        for(var i = 0; i < methodModel.parameters.length; i++) {
            var para = methodModel.parameters[i];
            var argument = arguments[para.name];
            if(util.isNullOrUndefined(argument)) {
                throw 'can not found essential argument: ' + para.name;
            }
            paraCode += argument + ', ';
        }

        paraCode = stringUtil.withoutSuffix(paraCode, ', ');
    }

    return methodModel.name + '(' + paraCode + ')';
}

var generateViewModelMethodCall = function(actionModel, viewModelArguments) {
    var vmArgs = objectUtil.clone(viewModelArguments);
    for(var k in vmArgs) {
        var v = vmArgs[k];
        var reg = /^@{(\w+)}$/g;
        if(reg.test(v)) {
            vmArgs[k] = RegExp.$1;
        }
    }

    var arguments = {};

    var methodModel = generateMethod(actionModel);
    methodModel.name = 'query';

    var paras = methodModel.parameters;
    for(var i = 0; i < paras.length; i++) {
        var para = paras[i];
        var arg = vmArgs[para.name];
        if(!util.isNullOrUndefined(arg)) {
            arguments[para.name] = arg;
            delete vmArgs[para.name];
        }
    }

    var hashMapCode = '';
    if(objectUtil.getSize(vmArgs) > 0) {
        hashMapCode = codeGenerateUtil.generateHashMap('map', vmArgs);
        arguments['parameters'] = 'map';
    }
    else {
        arguments['parameters'] = 'null';
    }

    var methodCall = generateMethodCallCode(methodModel, arguments);

    return {
        map: hashMapCode,
        methodCall: methodCall
    }
}

var generateAnnotation = function(action, model, method, url) {
    if(!stringUtil.isNotEmpty(url)) {
        url = '/' + nameUtil.getOperatorQueryResultObjectName(model);
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

exports.generateMethod = generateMethod;
exports.generateMethodCode = generateMethodCode;
exports.generateMethodCallCode = generateMethodCallCode;
exports.generateMethodCallCodeWithSameArgument = generateMethodCallCodeWithSameArgument;
exports.generateViewModelMethodCall = generateViewModelMethodCall;
