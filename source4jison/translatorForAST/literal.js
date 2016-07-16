var classLoader = require('../type/classLoader');

var translate = function (env, ast) {
    return [
        ast.raw, 
        classLoader.load('string')
    ];
}

exports.translate = translate;