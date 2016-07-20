'use strict'

let translatorMgr = require('./parserMgr');

let translate = function (env, ast) {
    let right = translatorMgr.findAndTranslate(env, ast.right);
    let setValue = right[0];

    let code = null;
    let returnType = null;
    if(ast.left.type == 'Identifier') {
        let ret = translatorMgr.findAndTranslate(env, ast.left);
        code = ret[0] + ' = ' + setValue;
        returnType = ret[1]; 
    }
    else if(ast.left.type == 'MemberExpression') {
        let translator = translatorMgr.find(ast.left.type);
        let ret = translator.translate(env, ast.left, true, setValue);
        code = ret[0];
        returnType = ret[1];
    }
    else {
        throw 'can not support assignment expression: ' + ast.left.type
    }

    return [code, returnType];
}

exports.translate = translate;