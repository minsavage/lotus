/**
 * Created by danney on 16/6/26.
 */
var translatorMgr = require('./translatorMgr');

var translate = function (env, ast) {
    var callee = ast.callee;
    if(callee.type == 'Identifier') {
        var handler = findSystemFunction(callee.name);
        if(R.isNil(handler)) {
            return handler(ast);
        }
    }

    var exp = ast.expression;
    var translate = translatorMgr.find(exp.type).translate;
    var ret = translate(env, exp);
    return ret;
}

var findSystemFunction = function (name) {
    var map = {
        'showPage': showPage,
        'closePage': closePage
    }

    return map[name];
}

var showPage = function () {
    
    
}

var closePage = function () {

}

exports.translate = translate;