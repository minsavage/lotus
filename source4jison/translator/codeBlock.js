/**
 * Created by danney on 16/6/26.
 */
var R = require('ramda');
var mustache = require('mustache');
var translatorMgr = require('./translatorMgr');
var strUtil = require('../util/strUtil');

var translateOne = function (env, ast) {
    return '------translateOne-----------';
}

var trace = function (x, y ) {
    console.log('-------trace-------');
    console.log(x);
    console.log(y);
    return x;
}

//var translate = function(x) {
//    var translateWithEnv = R.curry(translateOne)(x.env);
//    var translateCompose = R.compose(R.join('\r\r'), R.map(translateWithEnv), R.prop('body'));
//    return translateCompose(x)
//}

var map = R.compose(R.map, R.curry(translateOne), R.prop('env'));

var translate = R.compose(
    R.join('\r'),
    R.converge(R.call, [map, R.prop('body')])
);

exports.translate = translate;