/**
 * Created by danney on 16/6/26.
 */
var R = require('ramda');
var translatorMgr = require('./parserMgr');
var envExt = require('./envExt');
var memberCallTranslator = require('./expressionMemberCall');

var translate = function (env, ast) {
    var callee = ast.callee;
    if(callee.type == 'Identifier') {
        var handler = findSystemFunction(callee.name);
        if(!R.isNil(handler)) {
            return handler(ast);
        }
    }
    else if(callee.type == 'MemberExpression') {
        return memberCallTranslator.translate(env, ast);
    }
    else {
        throw 'can not support callee type for call expression: ' + callee.type;
    }
}

var findSystemFunction = function (name) {
    var map = {
        'showPage': showPage,
        'closePage': closePage,
        'native': native
    }

    return map[name];
}

var showPage = function () {
    
    
}

var closePage = function () {

}

var native = function (ast) {
    return ast.arguments[0].value;
}



exports.translate = translate;