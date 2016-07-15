/**
 * Created by danney on 16/6/26.
 */
var R = require('ramda');
var mustache = require('mustache');
var translatorMgr = require('./translatorMgr');
var strUtil = require('../util/strUtil');

var translateOne = function (env, ast) {
    var translate = translatorMgr.find(ast.type).translate;
    var ret = translate(env,ast);
    return ret[0] + ';';
}

var translate = function (env, codeBlock) {
    var translateOneWithEnv = R.curry(translateOne)(env);

    var start = R.compose(
        R.join('\r'),
        R.map(translateOneWithEnv)
    );

    var ret = start(codeBlock);
    return ret;
}

exports.translate = translate;