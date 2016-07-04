/**
 * Created by danney on 16/6/25.
 */
var Class = require('../type/class');
var Field = require('../type/field');
var util = require('util');
var R = require('ramda');

var createClass = function() {
    var aClass = new Class();
    return aClass;
}

var createFields = function (aClass, props) {
    aClass.addFields(R.map(createFiled, props));
}

var createFiled = function (prop) {
    var filed = new Field();
    filed.type = prop.type;
    filed.name = prop.name;
    if(!util.isNullOrUndefined(prop.defaultValue)) {
        filed.defaultValue = prop.defaultValue;
    }
    filed.isProperty = true;
    return filed;
}

exports.createClass = createClass;
exports.createFields = createFields;