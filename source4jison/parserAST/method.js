/**
 * Created by danney on 16/6/25.
 */
'use strict'
var R = require('ramda');
var mustache = require('mustache');
var translatorMgr = require('./parserMgr');

var render = function (annotations, returnType, name, parameters, content) {
    var tpl = '{{annotations}}\r {{returnType}} {{name}}({{parameters}}) {\r {{content}}\r}'
    var tplInterface = '{{annotations}}\r {{returnType}} {{name}}({{parameters}});'
    if(content == false) {
        tpl = tplInterface;
    }

    return mustache.render(tpl, {
        annotations: annotations,
        returnType: returnType,
        name: name,
        parameters: parameters,
        content: content
    })
}

var buildAnnotations = R.compose(R.join('\r'), R.prop('annotations'));

var buildParameter = function(param) {
    let annos = '';
    if(!R.isNil(param.annotations) && param.annotations.length > 0) {
        annos = R.join(' ', param.annotations);
        annos += ' ';
    }
    return annos + param.type + ' ' + param.name;
}

var buildParams = R.compose(
    R.join(', '),
    R.map(buildParameter),
    R.prop('parameters')
);

var buildCodeBlock = function(env, body) {
    return translatorMgr.find('codeBlock').translate(env, body)[0];
}

var buildBody = R.converge(
    buildCodeBlock,
    [R.nthArg(1), R.prop('body')]
);

var translate = R.converge(
    render,
    [
        buildAnnotations,
        R.prop('returnType'),
        R.prop('name'),
        buildParams,
        buildBody
    ]
);

var translateInterface = R.converge(
    render,
    [
        buildAnnotations,
        R.prop('returnType'),
        R.prop('name'),
        buildParams,
        R.always(false)
    ]
);

exports.translate = translate;
exports.translateInterface = translateInterface;