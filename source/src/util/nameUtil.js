/**
 * Created by danney on 16/1/26.
 */
var stringUtil = require('./stringUtil');

var pageToActivityName = function(name) {
    return stringUtil.withoutSuffix(name, 'Page') + 'Activity';
}

var vcToXmlFileName = function(name) {
    var str = stringUtil.withoutSuffix(name, 'ViewController');
    return 'vc_' + stringUtil.toLowerCaseWithUnderline(str);
}

var vcToBindingName = function(name) {
    var str = stringUtil.withoutSuffix(name, 'ViewController');
    return 'Vc' + str + 'Binding';
}

var operatorToServerFunctionName = function(operator, action) {
    return action + stringUtil.withoutSuffix(operator.name, 'Operator');
}

var operatorToServerPathName = function(operator) {
    var suffix = '';
    if(operator.resultType == 'collection') {
        suffix = 's';
    }
    return stringUtil.firstCharacterToLowercase(operator.model) + suffix;
}

var getOperatorFunctionName = function(actionName, modelName, resultType) {
    var name = getOperatorQueryResultObjectName(modelName);
    return actionName + stringUtil.firstCharacterToUppercase(name)
}

var getOperatorQueryResultClassName = function(modelName, resultType) {
    if(resultType == 'collection') {
        return 'Collection<' + modelName + '>';
    }
    else {
        return modelName;
    }
}

var getOperatorQueryResultObjectName = function(modelName, resultType) {
    modelName = stringUtil.firstCharacterToLowercase(modelName);
    if(resultType == 'collection' &&
        resultType.charAt(resultType.length-1) != 's') {
        return modelName + 's';
    }
    else {
        return modelName;
    }
}

exports.pageToActivityName = pageToActivityName;
exports.vcToXmlFileName = vcToXmlFileName;
exports.vcToBindingName = vcToBindingName;
exports.operatorToServerFunctionName = operatorToServerFunctionName;
exports.operatorToServerPathName = operatorToServerPathName;
exports.getOperatorFunctionName = getOperatorFunctionName;
exports.getOperatorQueryResultClassName = getOperatorQueryResultClassName;
exports.getOperatorQueryResultObjectName = getOperatorQueryResultObjectName;
