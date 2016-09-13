/**
 * Created by danney on 16/7/4.
 */
var R = require('ramda');
var nameUtil = require('../../util/nameUtil');

var mergeTwo = (a, b) => [].concat(a, b);
var mergeThree = (a, b, c) => [].concat(a, b, c);

var parametersConfigGrouped = R.compose(
    R.groupBy((x)=> x.paramType),
    R.prop('parameters')
);

var queryMethodName = R.compose(
    R.curry(nameUtil.getOperatorMethodName)('query'),
    R.prop('responseType')
);

var trace = function (x) {
    console.log(x);
    return x;
}

exports.trace = trace;
exports.mergeTwo = mergeTwo;
exports.mergeThree = mergeThree;
exports.queryMethodName = queryMethodName;
exports.parametersConfigGrouped = parametersConfigGrouped;