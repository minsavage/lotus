/**
 * Created by danney on 16/1/15.
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
var projectConfig = lotus.projectConfig;
var modelMgr = lotus.modelMgr;
var FunctionBuilder = require('../function/functionBuilder');
var BaseBuilder = require('../baseBuilder');


class ViewModelBuilder extends BaseBuilder {
    constructor() {
        super();
        this.operators = {};
    }

    parse(model) {
        super.parse(model);

        var result = '';
        result += this.buildProperties(model.properties);
        result += this.buildMethods(model.methods);

        return mustache.render(tpl.viewModel.main, {
            packageName: projectConfig.getPackageName(),
            import: this.importRecorder.generate(),
            className: stringUtil.firstCharacterToUppercase(model.name),
            content: result.trim()
        });

        return result;
    }

    buildProperties(properties) {
        var result = '';
        for(var k in  properties) {
            var p = properties[k];
            result += this.buildProperty(p);
        }
        return result;
    }

    buildProperty(property) {
        var ret = '';
        var name = property.name;
        var type = property.type;
        ret += codeGenerateUtil.generateMemberVariable(type, name) + '\r\r';
        ret += codeGenerateUtil.generateGetter(type, name, '@Bindable') + '\r\r';
        ret += codeGenerateUtil.generateSetterWithNotify(type, name) + '\r\r';
        return ret;
    }

    buildMethods(methods) {
        var result = '';
        for(var name in methods) {
            var method = methods[name];
            var array = method.action.split('.');
            var operator = array[0];
            var func = array[1];

            if(!util.isArray(this.operators[operator])) {
                this.operators[operator] = [];
            }

            method.name = name;
            this.operators[operator].push(method);
        }

        for(var name in this.operators) {
            result += this.buildOperator(name, this.operators[name]) + '\r\r';
        }
        return result;
    }

    buildOperator(name, methods) {
        var result = '';
        result += codeGenerateUtil.generateMemberVariable(name, name) + '\r\r';

        this.importRecorder.add('$.operator.' + name);

        for(var k in methods) {
            var method = methods[k];
            result += this.buildMethod(method)
        }
        return result;
    }

    buildMethod(method) {
        var result = '';
        var array = method.action.split('.');
        var operator = array[0];
        var func = array[1];
        if(func == 'query') {
            result += this.buildQuery(method, operator);
        }
        else {
            throw 'do not support action: ' + func;
        }
        return result;
    }

    buildQuery(method, operator) {
        var operatorModel = modelMgr.queryOperator(operator);
        if(operatorModel == null) {
            throw 'queryOperator failed';
        }

        var queryModel = operatorModel.action['query'];
        if(util.isNullOrUndefined(queryModel)) {
            throw 'query action does no exist in operator model';
        }

        var resultType = nameUtil.getOperatorQueryResultClassName(operatorModel.operatedModel, queryModel.resultType);
        var actionResult = this.buildAction(method.response.onSuccess);
        this.importRecorder.add(actionResult.import);
        var onSuccessStr = actionResult.code;
        var resultObj = actionResult.parameters[0];

        return mustache.render(tpl.viewModel.operatorQuery2, {
            actionName: method.name,
            operatorObjName: stringUtil.firstCharacterToLowercase(operator),
            parameters: this.getParameters(method.parameters),
            setParameters: this.buildSetParameters(method.parameters),
            resultType: resultType,
            resultObj: resultObj,
            onSuccess: onSuccessStr,
            //onFail: onFailStr
        });
    }

    getParameters(parameters) {
        if(util.isNullOrUndefined(parameters)) {
            return 'null';
        }
        else {
            return 'map';
        }
    }

    buildSetParameters(parameters) {
        if(util.isNullOrUndefined(parameters)) {
            return '';
        }

        this.importRecorder.add('java.util.HashMap');

        var codeOptions = '';
        for(var k in parameters) {
            var p = parameters[k];
            if(util.isString(p)) {
                if(p.indexOf('{@')) {
                    p = p.substr(2, p.length-3);
                }
                else {
                    p = '\"' + p + '\"';
                }
            }
            codeOptions += mustache.render(tpl.viewModel.putMap, {key: k, value: p});
        }
        codeOptions = tpl.viewModel.map + codeOptions;
        return codeOptions;
    }

    buildAction(actions) {
        if(!util.isFunction(actions)) {
            return {
                code: '',
                import: [],
                parameters: []
            };
        }

        var functionBuilder = new FunctionBuilder();
        return functionBuilder.parse(actions);
    }
}

//ViewModelBuilder.prototype.parse = function(model) {
//    if(model.name == undefined || model.name == null) {
//        console.log('model.name == null');
//        return;
//    }
//
//    importUtil.fill(this._importRecorder, model.import);
//
//    this._model = model;
//
//    var content = '';
//    content += this._buildProperties(model.properties);
//    content += this._buildOperators(model.operators);
//
//    return mustache.render(tpl.viewModel.main, {
//        packageName: projectConfig.getPackageName(),
//        import: this._importRecorder.generate(),
//        className: stringUtil.firstCharacterToUppercase(model.name),
//        content: content.trim()
//    });
//}

//
//ViewModelBuilder.prototype._buildOperators = function(operators) {
//    var result = '';
//    for(var name in operators) {
//        var operator = operators[name];
//        result += codeGenerateUtil.generateMemberVariable(name, name) + '\r\r';
//        result += this._buildOperator(name, operator) + '\r\r';
//    }
//    return result;
//}
//
//ViewModelBuilder.prototype._buildOperator = function(name, operator) {
//    var operatorOriginal = modelMgr.queryOperator(name);
//    if(operatorOriginal == null) {
//        throw 'queryOperator failed';
//    }
//
//    var result = '';
//
//    for(var name in operator) {
//        var action = operator[name];
//        if(action.type == 'query') {
//            result += this._buildOperatorQuery(operatorOriginal, action, name) + '\r\r';
//        }
//        else if(action.type == 'save') {
//            result += this._buildOperatorAction(operatorOriginal, action, 'save');
//        }
//    }
//
//    //if(!util.isNullOrUndefined(operator.query)) {
//    //    result += this._buildOperatorQuery(operatorOriginal, operator.query) + '\r\r';
//    //}
//    //
//    //if(!util.isNullOrUndefined(operator.save)) {
//    //    result += this._buildOperatorAction(operatorOriginal, operator.save, 'save');
//    //}
//
//    this._importRecorder.addOperator(operatorOriginal.name);
//    this._importRecorder.addModel(operatorOriginal.model);
//
//    if(operatorOriginal.resultType == 'collection') {
//        this._importRecorder.addOther('base.CollectionCallback');
//        this._importRecorder.addOther('base.Collection');
//    }
//    else {
//        this._importRecorder.addOther('base.Callback');
//    }
//
//    return result;
//}

//ViewModelBuilder.prototype._buildOperatorQuery = function(operatorOriginal, queryModel, name) {
//    var callbackStr = '';
//    if(operatorOriginal.resultType == 'object') {
//        callbackStr = 'Callback';
//    }
//    else {
//        callbackStr = 'CollectionCallback';
//    }
//
//    var paraStr = '';
//    var codeOptions = ''
//
//    if(operatorOriginal.accessType == 'local') {
//        paraStr = 'context.get(), ';
//    }
//    else {
//        var parameters = queryModel.requestParameters;
//        if(util.isArray(parameters) && parameters.length > 0) {
//            for(var i = 0; i < parameters.length; ++i) {
//                var p = parameters[i];
//                if(!this._isProperty(p)) {
//                    throw 'there is no property to be request parameter: ' + p;
//                }
//                codeOptions += mustache.render(tpl.viewModel.putMap, {key: p, value: p});
//            }
//            codeOptions = tpl.viewModel.map + codeOptions;
//            this._importRecorder.addPlain('java.util.HashMap');
//
//            paraStr += 'map, '
//        }
//        else {
//            paraStr += 'null, '
//        }
//    }
//
//    var nameWithoutOperator = stringUtil.withoutSuffix(operatorOriginal.name, 'Operator');
//
//    var onSuccessStr = '';
//    if(!util.isNullOrUndefined(queryModel.response.success)) {
//        onSuccessStr = this._buildAction(queryModel.response.success.action);
//    }
//
//    var onFailStr = '';
//    if(!util.isNullOrUndefined(queryModel.response.fail)) {
//        onFailStr = this._buildAction(queryModel.response.fail.action);
//    }
//
//    return mustache.render(tpl.viewModel.operatorQuery, {
//        actionName: name,
//        operatorObjName: stringUtil.firstCharacterToLowercase(operatorOriginal.name),
//        operatorClassName: stringUtil.firstCharacterToUppercase(operatorOriginal.name),
//        parameters: paraStr,
//        options: codeOptions,
//        callback: callbackStr,
//        model: operatorOriginal.model,
//        resultType: queryModel.response.success.data.type,
//        resultObj: queryModel.response.success.data.name,
//        onSuccess: onSuccessStr,
//        onFail: onFailStr
//    });
//}

//
//ViewModelBuilder.prototype._buildOperatorAction = function(operatorOriginal, queryModel, actionName) {
//    var callbackStr = '';
//    if(operatorOriginal.resultType == 'object') {
//        callbackStr = 'Callback';
//    }
//    else {
//        callbackStr = 'CollectionCallback';
//    }
//
//    var paraStr = '';
//    if(operatorOriginal.accessType == 'local') {
//        paraStr = 'context.get(), ';
//    }
//
//    var parameters = queryModel.requestParameters;
//    if(parameters != undefined && parameters != null) {
//        for(var i = 0; i < parameters.length; ++i) {
//            var p = parameters[i];
//            paraStr += p + ', ';
//        }
//    }
//
//    var nameWithoutOperator = stringUtil.withoutSuffix(operatorOriginal.name, 'Operator');
//
//    var onSuccessStr = '';
//    if(!util.isNullOrUndefined(queryModel.response.success)) {
//        onSuccessStr = this._buildAction(queryModel.response.success.action);
//    }
//
//    var onFailStr = '';
//    if(!util.isNullOrUndefined(queryModel.response.fail)) {
//        onFailStr = this._buildAction(queryModel.response.fail.action);
//    }
//
//    return mustache.render(tpl.viewModel.operatorAction, {
//        actionName: actionName,
//        nameWithoutOperatorSuffix: stringUtil.firstCharacterToUppercase(nameWithoutOperator),
//        operatorObjName: stringUtil.firstCharacterToLowercase(operatorOriginal.name),
//        operatorClassName: stringUtil.firstCharacterToUppercase(operatorOriginal.name),
//        parameters: paraStr,
//        callback: callbackStr,
//        model: operatorOriginal.model,
//        resultType: queryModel.response.success.data.type,
//        resultObj: queryModel.response.success.data.name,
//        onSuccess: onSuccessStr,
//        onFail: onFailStr
//    });
//}
//
////ViewModelBuilder.prototype._buildOperatorQueryOnSuccess = function(queryModel) {
////    var result = '';
////    var actions = queryModel.response.success.action;
////    if(actions != undefined && actions != null) {
////        for(var leftValue in actions) {
////            var rightValue = actions[leftValue];
////            result += codeGenerateUtil.generateSetterCall(null, leftValue, rightValue);
////        }
////    }
////    return result;
////}
//
//ViewModelBuilder.prototype._buildAction = function(actions) {
//    if(!util.isFunction(actions)) {
//        return '';
//    }
//
//    var functionBuilder = new FunctionBuilder();
//    var codeRecorder = functionBuilder.parse(actions);
//    this._importRecorder.addAll(codeRecorder.getImportRecorder());
//    return codeRecorder.getOnCreate();
//    //
//    //
//    //
//    //else if(util.isObject(actions)) {
//    //    return buildActionByKeyValue(actions);
//    //}
//    //else if(util.isFunction(actions)) {
//    //    return buildActionByFunction(actions);
//    //}
//    //else {
//    //    return '';
//    //}
//}
//
//ViewModelBuilder.prototype._isProperty = function(name) {
//    var properties = this._model.properties
//    for(var k in properties) {
//        var p = properties[k];
//        if(p.name == name) {
//            return true;
//        }
//    }
//    return false;
//}

module.exports = ViewModelBuilder;