/**
 * Created by danney on 16/6/25.
 */
var R = require('ramda');
var Class = require('../type/class');
var Field = require('../type/field');
var Method = require('../type/method');
var Parameter = require('../type/parameter');
var util = require('util');
var queryMethod = require('./operator/queryMethod');
var queryMethodService = require('./operator/queryMethodService');


var createQueryMethod = function (aClass, model) {
    aClass.addMethod(queryMethod.make(model));
    aClass.import.push('system.rx.Observable');
    aClass.import.push('system.type.HashMap');
}

var createQueryMethodService = function (model) {
    return queryMethodService.make(model);
}

var createClass = function() {
    var aClass = new Class();
    return aClass;
}

exports.createClass = createClass;
exports.createQueryMethod = createQueryMethod;
exports.createQueryMethodService = createQueryMethodService;