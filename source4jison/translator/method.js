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

var buildParameter = function(param) {
    return param.type + ' ' + param.name;
}

var trace = function (x) {
    console.log('-----------------');
    console.log(x);
    return x;
}

var buildAnnotations = R.compose(R.join('\r'), trace, trace, R.prop('annotations'));

var buildParams = R.compose(
    R.join(', '),
    R.map(buildParameter),
    R.prop('parameters')
);

var translate = R.converge(
    render,
    [
        buildAnnotations,
        R.prop('returnType'),
        R.prop('name'),
        buildParams,
        R.prop('body')
    ]
);

exports.translate = translate;