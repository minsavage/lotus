'use strict'
let translatorMgr = require('./parserMgr');

let translate = function (env, ast) {
    let ret = translatorMgr.findAndTranslate(env, ast.argument);
    return [
        'return ' + ret[0],
        ret[1]
    ]
}

exports.translate = translate;