/**
 * Created by danney on 16/1/15.
 */
var util = require('util');
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var stringUtil = lotus.util.stringUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var variableTypeUtil = lotus.util.variableTypeUtil;
var projectConfig = lotus.projectConfig;
var modelMgr = lotus.modelMgr;
var ImportRecorder = lotus.recorder.ImportRecorder;
var FunctionBuilder = require('../function/functionBuilder');

var ViewModelBuilder = function() {
    this._importRecorder = new ImportRecorder();
}

ViewModelBuilder.prototype.parse = function(model) {
    if(model.name == undefined || model.name == null) {
        console.log('model.name == null');
        return;
    }

    var content = '';
    content += this._buildProperties(model.properties);
    content += this._buildOperators(model.operators);

    return mustache.render(tpl.viewModel.main, {
        packageName: projectConfig.getPackageName(),
        import: this._importRecorder.generate(),
        className: stringUtil.firstCharacterToUppercase(model.name),
        content: content.trim()
    });
}

ViewModelBuilder.prototype._buildProperties = function(properties) {
    var result = '';
    for(var k in  properties) {
        var p = properties[k];
        result += this._buildProperty(p);
    }
    return result;
}

ViewModelBuilder.prototype._buildProperty = function(property) {
    var name = property.name;
    var type = property.type;

    var ret = '';
    ret += codeGenerateUtil.generateMemberVariable(type, name) + '\r\r';
    ret += codeGenerateUtil.generateGetter(type, name, '@Bindable') + '\r\r';
    ret += codeGenerateUtil.generateSetterWithNotify(type, name) + '\r\r';

    if(variableTypeUtil.isModel(type)) {
        this._importRecorder.addModel(type);
    }
    else {
        var importStr = variableTypeUtil.queryImport(type);
        if(lotus.util.stringUtil.isNotEmpty(importStr)) {
            this._importRecorder.addPlain(importStr);
        }
    }

    return ret;
}

ViewModelBuilder.prototype._buildOperators = function(operators) {
    var result = '';
    for(var name in operators) {
        var operator = operators[name];
        result += codeGenerateUtil.generateMemberVariable(name, name) + '\r\r';
        result += this._buildOperator(name, operator) + '\r\r';
    }
    return result;
}

ViewModelBuilder.prototype._buildOperator = function(name, operator) {
    var operatorOriginal = modelMgr.queryOperator(name);
    if(operatorOriginal == null) {
        throw 'queryOperator failed';
    }

    var result = '';
    if(operator.query != undefined || operator.query != null) {
        result += this._buildOperatorQuery(operatorOriginal, operator.query) + '\r\r';
    }

    if(!util.isNullOrUndefined(operator.save)) {
        result += this._buildOperatorAction(operatorOriginal, operator.save, 'save');
    }

    this._importRecorder.addOperator(operatorOriginal.name);
    this._importRecorder.addModel(operatorOriginal.model);

    if(operatorOriginal.resultType == 'collection') {
        this._importRecorder.addOther('base.CollectionCallback');
        this._importRecorder.addOther('base.Collection');
    }
    else {
        this._importRecorder.addOther('base.Callback');
    }

    return result;
}

ViewModelBuilder.prototype._buildOperatorQuery = function(operatorOriginal, queryModel) {
    var callbackStr = '';
    if(operatorOriginal.resultType == 'object') {
        callbackStr = 'Callback';
    }
    else {
        callbackStr = 'CollectionCallback';
    }

    var paraStr = '';
    if(operatorOriginal.accessType == 'local') {
        paraStr = 'context.get(), ';
    }
    else {
        //todo: 这里参数暂时都用null 代替， 后续需要修改
        paraStr += 'null, '
    }



    //var parameters = queryModel.requestParameters;
    //if(parameters != undefined && parameters != null) {
    //    for(var i = 0; i < parameters.length; ++i) {
    //        var p = parameters[i];
    //        paraStr += p + ', ';
    //    }
    //}

    var nameWithoutOperator = stringUtil.withoutSuffix(operatorOriginal.name, 'Operator');

    var onSuccessStr = '';
    if(!util.isNullOrUndefined(queryModel.response.success)) {
        onSuccessStr = this._buildAction(queryModel.response.success.action);
    }

    var onFailStr = '';
    if(!util.isNullOrUndefined(queryModel.response.fail)) {
        onFailStr = this._buildAction(queryModel.response.fail.action);
    }

    return mustache.render(tpl.viewModel.operatorQuery, {
        nameWithoutOperatorSuffix: stringUtil.firstCharacterToUppercase(nameWithoutOperator),
        operatorObjName: stringUtil.firstCharacterToLowercase(operatorOriginal.name),
        operatorClassName: stringUtil.firstCharacterToUppercase(operatorOriginal.name),
        parameters: paraStr,
        callback: callbackStr,
        model: operatorOriginal.model,
        resultType: queryModel.response.success.data.type,
        resultObj: queryModel.response.success.data.name,
        onSuccess: onSuccessStr,
        onFail: onFailStr
    });
}


ViewModelBuilder.prototype._buildOperatorAction = function(operatorOriginal, queryModel, actionName) {
    var callbackStr = '';
    if(operatorOriginal.resultType == 'object') {
        callbackStr = 'Callback';
    }
    else {
        callbackStr = 'CollectionCallback';
    }

    var paraStr = '';
    if(operatorOriginal.accessType == 'local') {
        paraStr = 'context.get(), ';
    }

    var parameters = queryModel.requestParameters;
    if(parameters != undefined && parameters != null) {
        for(var i = 0; i < parameters.length; ++i) {
            var p = parameters[i];
            paraStr += p + ', ';
        }
    }

    var nameWithoutOperator = stringUtil.withoutSuffix(operatorOriginal.name, 'Operator');

    var onSuccessStr = '';
    if(!util.isNullOrUndefined(queryModel.response.success)) {
        onSuccessStr = this._buildAction(queryModel.response.success.action);
    }

    var onFailStr = '';
    if(!util.isNullOrUndefined(queryModel.response.fail)) {
        onFailStr = this._buildAction(queryModel.response.fail.action);
    }

    return mustache.render(tpl.viewModel.operatorAction, {
        actionName: actionName,
        nameWithoutOperatorSuffix: stringUtil.firstCharacterToUppercase(nameWithoutOperator),
        operatorObjName: stringUtil.firstCharacterToLowercase(operatorOriginal.name),
        operatorClassName: stringUtil.firstCharacterToUppercase(operatorOriginal.name),
        parameters: paraStr,
        callback: callbackStr,
        model: operatorOriginal.model,
        resultType: queryModel.response.success.data.type,
        resultObj: queryModel.response.success.data.name,
        onSuccess: onSuccessStr,
        onFail: onFailStr
    });
}

//ViewModelBuilder.prototype._buildOperatorQueryOnSuccess = function(queryModel) {
//    var result = '';
//    var actions = queryModel.response.success.action;
//    if(actions != undefined && actions != null) {
//        for(var leftValue in actions) {
//            var rightValue = actions[leftValue];
//            result += codeGenerateUtil.generateSetterCall(null, leftValue, rightValue);
//        }
//    }
//    return result;
//}

ViewModelBuilder.prototype._buildAction = function(actions) {
    if(!util.isFunction(actions)) {
        return '';
    }

    var functionBuilder = new FunctionBuilder();
    var codeRecorder = functionBuilder.parse(actions);
    this._importRecorder.addAll(codeRecorder.getImportRecorder());
    return codeRecorder.getOnCreate();
    //
    //
    //
    //else if(util.isObject(actions)) {
    //    return buildActionByKeyValue(actions);
    //}
    //else if(util.isFunction(actions)) {
    //    return buildActionByFunction(actions);
    //}
    //else {
    //    return '';
    //}
}

var buildActionByKeyValue = function(map) {
    var result = '';
    for(var leftValue in map) {
        var rightValue = map[leftValue];
        result += codeGenerateUtil.generateSetterCall(null, leftValue, rightValue);
    }
    return result;
}

var buildActionByFunction = function(func) {
    var str = func.toString();
    var offset = 13;
    return str = str.substr(offset, str.length-offset-1).trim();
}

module.exports = ViewModelBuilder;