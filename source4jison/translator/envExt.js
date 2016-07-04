/**
 * Created by danney on 16/7/1.
 */
var R = require('ramda');

var add = function (scope, env, info) {
    if(R.isNil(env)) {
        env = {};
    }

    return R.merge(env, {scope: info});
}

var addClassScope = R.curry(add)('classScope');
var addThisScope = R.curry(add)('thisScope');
var addLocalScope = R.curry(add)('localScope');

var find = function () {

};

exports.addClassScope = addClassScope;
exports.addThisScope = addThisScope;
exports.addLocalScope = addLocalScope;
exports.find = find;