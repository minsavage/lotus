/**
 * Created by danney on 16/6/25.
 */
var R = require('ramda');
var mustache = require('mustache');
var translatorMgr = require('./parserMgr');
var strUtil = require('../util/strUtil');
var createEnv = require('./envExt').createEnv;
var addEnv = require('./envExt').add;

var render = function(name, fields, methods, superClass) {
    if(strUtil.isNotEmpty(superClass)) {
        superClass = 'extends ' + superClass;
    }

    var tpl = 'class {{name}} {{superClass}}\r{\r {{fields}}\r{{methods}}\r}'
    return mustache.render(tpl, {
        name: name,
        fields: fields,
        methods: methods,
        superClass: superClass
    })
}

var buildMethods = function(aClass) {
    var translate = translatorMgr.find('method').translate;
    var env = createEnv(aClass);

    var methodArgs = R.compose(
        R.map(R.pick(['name', 'type'])),
        R.prop('parameters')
    );

    var buildMethod = function (method) {
        var args = methodArgs(method);
        var envExt = addEnv(env, args);
        return translate(method, envExt);
    }

    var start = R.compose(
        R.join('\r\r'),
        R.map(buildMethod),
        R.prop('methods')
    );

    var ret = start(aClass);
    return ret;
}

var buildField = translatorMgr.find('field').translate;

var buildFields = R.compose(R.join('\r'), R.map(buildField), R.prop('fields'));

var translate = R.converge(render, [R.prop('name'), buildFields, buildMethods, R.prop('superClass')]);

exports.translate = translate;