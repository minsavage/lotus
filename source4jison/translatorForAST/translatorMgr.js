/**
 * Created by danney on 16/6/25.
 */
'use strict'

var map = null;

var getMap = function () {
    return {
        'field': require('./field'),
        'method': require('./method'),
        'codeBlock': require('./codeBlock'),
        'ExpressionStatement': require('./expression'),
        'CallExpression': require('./expressionCall'),
        'MemberExpression': require('./expressionMember'),
        'VariableDeclaration': require('./variableDeclaration'),
        'NewExpression': require('./expressionNew'),
        'Identifier': require('./identifier'),
        'Literal': require('./literal'),
        'ArrowFunctionExpression': require('./expressionFunction'),
        'FunctionExpression': require('./expressionFunction'),
        'ReturnStatement': require('./returnStatement'),
    }
}

var find = function (name) {
    if(map == null) {
        map = getMap();
    }

    var translator = map[name];
    if(translator == undefined || translator == null) {
        return null;
    }
    else {
        return translator;
    }
}

var findAndTranslate = function (env, ast) {
    var translator = find(ast.type);
    if(translator != null) {
        return translator.translate(env, ast);
    }
    else {
        return null;
    }
}

exports.find = find;
exports.findAndTranslate = findAndTranslate;