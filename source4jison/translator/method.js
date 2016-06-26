/**
 * Created by danney on 16/6/25.
 */
var mustache = require('mustache');
var translatorMgr = require('./translatorMgr');

var translate = function (method) {
    //var tpl = '{{modifier}} {{type}} {{name}}'

    //return mustache.render(tpl, {
    //    modifier: 'private',
    //    type: field.type,
    //    name: field.name
    //})

    return 'my name is method';
}

exports.translate = translate;