/**
 * Created by danney on 16/7/1.
 */
var R = require('ramda');
var Field = require('./field');
var envExt = require('../translator/envExt');
var find = envExt.find;

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

var load = function (fullType) {
    var reg = /^\$\.(\w+)\.(\w+)$/g;
    if(reg.test(fullType)) {
        return loadInModels(RegExp.$1, RegExp.$2);
    }
    else {
        return loadInFile();
        
    }
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

var loadInFile = function () {

}


exports.init = init;
exports.load = load;