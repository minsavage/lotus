/**
 * Created by danney on 16/6/25.
 */
'use strict'
var R = require('ramda');
var mustache = require('mustache');
var parserMgr = require('./parserMgr');
var translatorMgr = require('../translator/translatorMgr');
var envExt = require('./envExt');

var render = function (name, modifiers, annotations, returnType, parameters, content) {
    let nameCombine = R.join(' ')([modifiers, returnType, name]).trim();
    nameCombine = R.join('\r')([annotations, nameCombine]).trim();

    var tpl = '{{name}}({{parameters}}) {\r {{content}}\r}'
    var tplInterface = '{{name}}({{parameters}});'
    if(content == false) {
        tpl = tplInterface;
    }

    return mustache.render(tpl, {
        name: nameCombine,
        parameters: parameters,
        content: content
    }).trim();
}

var buildAnnotations = R.compose(R.join('\r'), R.prop('annotations'));

var parsrParameter = R.curry(function(env, param) {
    let javaTypeName = null;
    try {
        let type = envExt.find(env, param.type);
        let translator = translatorMgr.find(type.fullName);
        javaTypeName = translator.translateClassName(env, type);
    }
    catch(err) {
        javaTypeName = param.type;
    }
    
    if(R.length(param.annotations) > 0) {
        let annos = R.join(' ', param.annotations);
        javaTypeName = annos + ' ' + javaTypeName;
    }

    return javaTypeName + ' ' + param.name;
});

var parseParams = function (method, env) {
    let parsrParameterWithEnv = parsrParameter(env);
    var start = R.compose(
        R.join(', '),
        R.map(parsrParameterWithEnv),
        R.prop('parameters')
    );
    return start(method);
}

var buildCodeBlock = function(env, body) {
    return parserMgr.find('codeBlock').translate(env, body)[0];
}

var buildBody = R.converge(
    buildCodeBlock,
    [R.nthArg(1), R.prop('body')]
);

var parseReturnType = function (method, env) {
    let type = envExt.find(env, method.returnType);
    let translator = translatorMgr.find(type.fullName);
    return translator.translateClassName(env, type);
}

var parseModifiers = R.compose(
    R.trim,
    R.join(' '),
    R.prop('modifiers')
)

var translate = R.converge(
    render,
    [
        R.prop('name'),
        parseModifiers,
        buildAnnotations,
        parseReturnType,
        parseParams,
        buildBody
    ]
);

var translateInterface = R.converge(
    render,
    [
        R.prop('name'),
        parseModifiers,
        buildAnnotations,
        parseReturnType,
        parseParams,
        R.always(false)
    ]
);

exports.translate = translate;
exports.translateInterface = translateInterface;