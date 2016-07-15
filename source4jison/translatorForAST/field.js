/**
 * Created by danney on 16/6/25.
 */
var mustache = require('mustache');
var translatorMgr = require('./translatorMgr');

var translate = function (field) {
    var tpl = '{{modifier}} {{type}} {{name}};'

    return mustache.render(tpl, {
        modifier: 'private',
        type: field.type,
        name: field.name
    })

}

exports.translate = translate;