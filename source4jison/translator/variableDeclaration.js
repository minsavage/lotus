/**
 * Created by danney on 16/6/26.
 */
var R = require('ramda');
var translatorMgr = require('./translatorMgr');
var envExt = require('./envExt');
var mustache = require('mustache');

var translate = function (env, ast) {
    var init = ast.declarations[0].init;
    var id = ast.declarations[0].id;
    if(R.isNil(init)) {
        throw 'var declaration can not have init';
    }

    var initTranslator = translatorMgr.find(init.type);
    var initRet = initTranslator.translate(env, init);
    
    var initCode = initRet[0];
    var type = initRet[1];

    env.unshift({name: id.name, type: type.name});

    var tpl = '{{type}} {{name}} = {{init}}';
    return mustache.render(tpl, {
        type: type.name,
        name: id.name,
        init: initCode,
    });
}

exports.translate = translate;