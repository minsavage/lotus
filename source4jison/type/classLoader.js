/**
 * Created by danney on 16/7/1.
 */
var R = require('ramda');
var pathUtil = require('path');
var Class = require('./class');
var Field = require('./field');
var Method = require('./method');
var envExt = require('../translatorForAST/envExt');
var find = envExt.find;
var baseDir = '../meta';

var pathToModel = function(path) {
    return null;
}

var buildEnv = R.compose(
    envExt.addClassScope,
    R.map(load),
    R.prop('import')
);

var buildProperty = function(prop) {
    var field = new Field();
    field.name = prop.name;
    field.type = find(env, prop.name);
    field.defaultValue = prop.defaultValue;
    field.isProperty = true;
}

var buildProps = R.compose(
    R.map(buildProperty),
    R.prop('properties')
);



var modelsContainer = null;

var init = function (container) {
    modelsContainer = container;
}

var load = function (fullName) {
    var aClass = null;
    var reg = /^\$\.(\w+)\.(\w+)$/g;
    if(reg.test(fullName)) {
        aClass = loadInModels(RegExp.$1, RegExp.$2);
    }
    else {
        if(isBuiltInType(fullName)) {
            fullName = 'system.type.' + fullName;
        }
        aClass = loadInFile(fullName);
    }

    if(aClass != null) {
        aClass.fullName = fullName;
    }
    return aClass;
}

var loadInModels = function (modelType, modelName) {
    var models = R.path([modelType], modelsContainer);
    if(R.isNil(models)) {
        return null;
    }
    else {
        var ret = R.find(R.propEq('name', modelName))(models);
        if(R.isNil(ret)) {
            ret = null;
        }
        return ret;
    }
}

var absTypePath = function (typePath) {
    return pathUtil.resolve(__dirname, baseDir, typePath);
}

var metaToClass = function (meta) {
    var aClass = new Class();
    aClass.name = meta.name;

    var mapToField = function (prop) {
        var field = new Field();
        field.name = prop.name;
        field.type = prop.type;
        return field;
    }

    var mapToMethod = function (m) {
        var method = new Method();
        method.name = m.name;
        method.returnType = m.returnType;
        return method;
    }

    var getFields = R.compose(R.map(mapToField), R.prop('fields'));
    var getMethods = R.compose(R.map(mapToMethod), R.prop('methods'));

    aClass.addFields(getFields(meta));
    aClass.addMethods(getMethods(meta));
    
    return aClass;
}

var metaPath = R.compose(absTypePath, R.join('/'), R.split('.'));
var loadInFile = R.compose(metaToClass, require, metaPath);

var isBuiltInType = function (type) {
    if(type == 'int' || type == 'string' || type == 'bool' || type == 'object')
    {
        return true;
    }
    else {
        return false;
    }
}

exports.init = init;
exports.load = load;
exports.isBuiltInType = isBuiltInType;