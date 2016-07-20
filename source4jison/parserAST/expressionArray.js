'use strict'
let translatorMgr = require('./parserMgr');

let translate = function (env, ast) {
    let code = 'new ArrayList()';
    return [code, null];
}

exports.translate = translate;