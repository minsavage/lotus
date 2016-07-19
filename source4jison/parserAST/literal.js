'use strict';
let R = require('ramda');
let classLoader = require('../type/classLoader');

var translate = function (env, ast) {
    let type = R.type(ast.value);
    let value = null;
    if(type == 'Boolean') {
        type = classLoader.load('bool'); 
        value = ast.value;
    }
    else if(type == 'String') {
        type = classLoader.load('string');
        value = '"' + ast.value + '"'
    }
    else {
        throw 'can not support literal type: ' + type;
    }

    return [value, type];
}

exports.translate = translate;