/**
 * Created by danney on 16/6/25.
 */
var R = require('ramda');
var mustache = require('mustache');
var translatorMgr = require('./translatorMgr');

var build = function(name, fields, methods) {
    var tpl = 'class {{name}}\r{\r {{fields}}\r\r {{methods}}\r}'
    return mustache.render(tpl, {
        name: name,
        fields: fields,
        methods: methods
    })
}

var buildField = translatorMgr.find('field').translate;
var buildMethod = translatorMgr.find('method').translate;
var buildFields = R.compose(R.map(buildField), R.prop('fields'));
var buildMethods = R.compose(R.map(buildMethod), R.prop('methods'));
var translate = R.converge(build, [R.prop('name'), buildFields, buildMethods]);

exports.translate = translate;