/**
 * Created by danney on 16/6/25.
 */
var R = require('ramda');
var mustache = require('mustache');
var translatorMgr = require('./translatorMgr');

var render = function (annotations, returnType, name, parameters, content) {
    var tpl = '{{annotations}}\r {{returnType}} {{name}}({{parameters}}) {\r {{content}}\r}'

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
    return param.type + ' ' + param.name;
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

exports.translate = translate;