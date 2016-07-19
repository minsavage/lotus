/**
 * Created by danney on 16/6/25.
 */
'use strict'
let R = require('ramda');
let mustache = require('mustache');
let envExt = require('./envExt');
let translatorMgr = require('../translator/translatorMgr');

let parse = R.curry(function (env, field) {
    let tpl = '{{modifier}} {{type}} {{name}};'
    let type = envExt.find(env, field.type);
    let translator = translatorMgr.find(type.fullName);
    let javaClassName = translator.translateClassName(env, type);

    return mustache.render(tpl, {
        modifier: 'private',
        type: javaClassName,
        name: field.name
    })
})

exports.parse = parse;