/**
 * Created by danney on 16/7/10.
 */
var R = require('ramda');
var translatorMgr = require('./parserMgr');
var envExt = require('./envExt');

var translate = function (env, ast) {
    return [
        ast.name,
        envExt.find(env, ast.name)
    ]
}

exports.translate = translate;