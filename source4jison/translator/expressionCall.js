/**
 * Created by danney on 16/6/26.
 */
var R = require('ramda');
var translatorMgr = require('./translatorMgr');
var envExt = require('./envExt');

var trace = function (x, y) {
    console.log(x);
    console.log(y);
    return x;
}

var translate = function (env, ast) {
    var callee = ast.callee;
    if(callee.type == 'Identifier') {
        var handler = findSystemFunction(callee.name);
        if(!R.isNil(handler)) {
            return handler(ast);
        }
    }
    else {
        return handleMemberCall(env, ast);
    }
}

var translateByType = function (env, ast) {
    var translator = translatorMgr.find(ast.type);
    if(R.isNil(translator)) {
        return null;
    }
    else {
        return translator.translate(env, ast)
    }
};

var mapArg = R.curry(function (env, ast) {
    return translateByType(env, ast)[0];
});

var mapArgWithEnv = R.compose(mapArg, R.nthArg(0));
var argsProp = R.compose(R.prop('arguments'), R.nthArg(1));
var args = R.converge(R.map, [mapArgWithEnv, argsProp]);
var argsStr = R.compose(R.join(', '), args);

var handleMemberCall = function (env, ast) {
    var ret = translateByType(env, ast.callee);
    var callee = ret[0];
    var returnType = ret[1];

    var args = argsStr(env, ast);
    var code = callee + '(' + args + ')';
    return [code, returnType];
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