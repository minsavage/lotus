/**
 * Created by danney on 16/1/31.
 */
var util = require('util');
var mustache = require('mustache');
var tpl = require('../../template')('./template');
var globalConfig = require('../../globalConfig');
var stringUtil = require('../../util/stringUtil');
var variableTypeUtil = require('../../util/VariableTypeUtil');
var modelDataMgr = require('../../modelDataMgr');
var ViewModelBuilder = require('./ViewModelBuilder');

var ListViewModelBuilder = function() {
    ViewModelBuilder.call(this);

    this._propertyStr = '';
    this._operatorStr = '';
}

util.inherits(ListViewModelBuilder, ViewModelBuilder);

ListViewModelBuilder.prototype.parse = function(model) {
    if(util.isNullOrUndefined(model.name)) {
        throw 'model.name do not exist!' + '\r\r' + JSON.stringify(model);
    }

    if(util.isNullOrUndefined(model.list)) {
        throw 'model.list do not exist!' + '\r\r' + JSON.stringify(model);
    }

    this._buildList(model.list);

    this._propertyStr += this._buildProperties(model.properties);
    this._operatorStr += this._buildOperators(model.operators);
    var content = this._propertyStr + this._operatorStr;

    return mustache.render(tpl.listViewModel.main, {
        packageName: globalConfig.packageName,
        import: this._importGenerator.generate(),
        className: stringUtil.firstCharacterToUppercase(model.name),
        content: content.trim(),
        listObjName: model.list.name,
        modelClassName: model.list.modelType
    });
}
ListViewModelBuilder.prototype._buildList = function(list) {
    this._buildSetPagingOffset(list);
    this._buildListProperty(list);
    this._buildListOperator(list);
    this._importGenerator.addModel(list.modelType);
    this._importGenerator.addOperator(list.operator);
}

ListViewModelBuilder.prototype._buildListProperty = function(list) {
    if(util.isNullOrUndefined(list.name) || util.isNullOrUndefined(list.modelType)) {
        throw 'list.name or list.modelType do not exist!';
    }

    var property = {
        type: getListClassName(list),
        name: list.name
    }

    this._propertyStr += this._buildProperty(property);
}

ListViewModelBuilder.prototype._buildSetPagingOffset = function(list) {
    var array = list.sortingField.value.split('.');
    var modelType = array[0];
    var propertyName = array[1];

    if(modelType != list.modelType) {
        throw 'sortingField error, value = ' + list.sortingField.value;
    }

    var modelOriginal = modelDataMgr.queryModel(modelType);
    if(modelOriginal == null) {
        throw "modelDataMgr.queryModel failed";
    }

    var type = '';
    var properties = modelOriginal.properties;
    for(var k in properties) {
        var property = properties[k];
        if(property.name == propertyName) {
            type = variableTypeUtil.getType(property.type);
        }
    }

    if (type == '') {
        throw 'sortingField error, property does not exist in model: ' + list.sortingField.value;
    }

    var objName = getSortingFieldVariableName(propertyName);

    this._propertyStr += mustache.render(tpl.listViewModel.setPagingOffset, {
        className: type,
        objName: objName,
        listClassName: getListClassName(list),
        listObjName: list.name,
        property: stringUtil.firstCharacterToUppercase(propertyName)
    });
}

ListViewModelBuilder.prototype._buildListOperator = function(list) {
    var array = list.sortingField.value.split('.');
    var propertyName = array[1];

    this._operatorStr += mustache.render(tpl.listViewModel.operator, {
        operatorClassName: list.operator,
        operatorObjName: stringUtil.firstCharacterToLowercase(list.operator),
        OperatorNameWithoutSuffix: stringUtil.withoutSuffix(list.operator, 'Operator'),
        modelClassName: list.modelType,
        listObjName: list.name,
        sortingFieldKey: list.sortingField.key,
        sortingFieldValue: getSortingFieldVariableName(propertyName)
    });
}

var getListClassName = function(list) {
    return 'Collection<' + list.modelType + '>';
}

var getSortingFieldVariableName = function(propertyName) {
    return 'last' + stringUtil.firstCharacterToUppercase(propertyName);
}

module.exports = ListViewModelBuilder;