/**
 * Created by danney on 16/6/25.
 */
var R = require('ramda');
var mustache = require('mustache');
var translatorMgr = require('./translatorMgr');
var strUtil = require('../util/strUtil');

var render = function(name, fields, methods, superClass) {
    if(strUtil.isNotEmpty(superClass)) {
        superClass = 'extends ' + superClass;
    }

    var tpl = 'class {{name}} {{superClass}}\r{\r {{fields}}\r\r {{methods}}\r}'
    return mustache.render(tpl, {
        name: name,
        fields: fields,
        methods: methods,
        superClass: superClass
    })
}

var trace = function (x) {
    console.log(x);
    return x;
}

var buildField = translatorMgr.find('field').translate;
var buildMethod = translatorMgr.find('method').translate;
var buildFields = R.compose(R.map(buildField), R.prop('fields'));
var buildMethods = R.compose(R.join('\r\r'), R.map(buildMethod), R.prop('methods'));
var translate = R.converge(render, [R.prop('name'), buildFields, buildMethods, R.prop('superClass')]);

exports.translate = translate;