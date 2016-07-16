'use strict'
var R = require('ramda');
var envExt = require('./envExt');
var translatorMgr = require('./translatorMgr');

var translate = function(env, functionSignature, ast) {
    if(ast.params.length != functionSignature.parameters.length) {
        throw 'functionSignature error';
    }

    let key = ['type', 'name'];
    let getTypes = R.compose(R.map(R.prop('type')), R.prop('parameters'));
    let getNames = R.compose(R.map(R.prop('name')), R.prop('params'));
    
    let types = getTypes(functionSignature);
    let names = getNames(ast);

    let pairs = R.zip(types, names);
    let envPairs = R.map(R.zipObj(key), pairs);

    let currentEnv = envExt.add(env, envPairs);

    let translator = translatorMgr.find('codeBlock');
    let ret = translator.translate(currentEnv, ast.body.body);
    return ret;
}

exports.translate = translate;