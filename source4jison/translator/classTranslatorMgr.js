/**
 * Created by danney on 16/6/25.
 */
'use strict'

var map = null;

var getMap = function () {
    return {
        'system.type.HashMap': require('./hashMap')

        // 'field': require('./field'),
        // 'method': require('./method'),
        // 'codeBlock': require('./codeBlock'),
        // 'ExpressionStatement': require('./expression'),
        // 'CallExpression': require('./expressionCall'),
        // 'MemberExpression': require('./expressionMember'),
        // 'VariableDeclaration': require('./variableDeclaration'),
        // 'Identifier': require('./identifier')
    }
}

var defaultTranslator = require('./javaClassTranslator');

var find = function (className) {
    if(map == null) {
        map = getMap();
    }

    var translator = map[className];
    if(translator == undefined || translator == null) {
        return defaultTranslator;
    }
    else {
        return translator;
    }
}

exports.find = find;