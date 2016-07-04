/**
 * Created by danney on 16/7/1.
 */
var envExt = require('../translator/envExt');
var find = envExt.find;

var Field = require('./field');

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

var load = function (path) {
    var model = pathToModel()
    
}