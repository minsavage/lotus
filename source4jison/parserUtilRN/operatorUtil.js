/**
 * Created by danney on 16/6/25.
 */
'use strict'
let R = require('ramda');
let Method = require('../typeRN/method');

let makeQueryMethod = require('./operator/makeQueryMethod');

let Class = require('../typeRN/class');
// var Field = require('../type/field');

// var Parameter = require('../type/parameter');
// var util = require('util');
// var strUtil = require('../util/strUtil')
// var queryMethod = require('./operator/queryMethod');
// var queryMethodService = require('./operator/queryMethodService');
// let Interface = require('../type/interface')

let createClass = function (model) {
    return Class.create(model.name, model.fields, model.methods, model.import);
}

let createQueryMethod = function (model) {
    return {
        method: makeQueryMethod(model),
        import: [
            'Rx',
            '$.base.FetchUtil',
            '$.Config'
        ]
    }
}

let createConverter = function (converter) {
    return converter.op + '(' + converter.action + ')';
}

exports.createClass = createClass;
exports.createQueryMethod = createQueryMethod;
exports.createConverter = createConverter;