/**
 * Created by danney on 16/6/25.
 */
'use strict'
var R = require('ramda');
var mustache = require('mustache');
var translatorMgr = require('./parserMgr');
var strUtil = require('../util/strUtil');
var createEnv = require('./envExt').createEnv;
var addEnv = require('./envExt').add;

var renderClass = function(name, fields, methods, superClass) {
    if(strUtil.isNotEmpty(superClass)) {
        superClass = 'extends ' + superClass;
    }

    var tpl = 'public class {{name}} {{superClass}}\r{\r {{fields}}\r{{methods}}\r}'
    return mustache.render(tpl, {
        name: name,
        fields: fields,
        methods: methods,
        superClass: superClass
    })
}

var renderInterface = function(name, methods, superClass) {
    if(strUtil.isNotEmpty(superClass)) {
        superClass = 'extends ' + superClass;
    }

    var tpl = 'public interface {{name}} {{superClass}}\r{\r{{methods}}\r}'
    return mustache.render(tpl, {
        name: name,
        methods: methods,
        superClass: superClass
    })
}

var buildMethods = function(aClass) {
    let methodTranslator = translatorMgr.find('method');
    let translate = null;
    if('interface' == aClass.type) {
        translate = methodTranslator.translateInterface;
    }
    else {
        translate = methodTranslator.translate;
    }
    
    let env = createEnv(aClass);

    let methodArgs = R.compose(
        R.map(R.pick(['name', 'type'])),
        R.prop('parameters')
    );

    let buildMethod = function (method) {
        let args = methodArgs(method);
        let curEnv = addEnv(env, args);
        return translate(method, curEnv);
    }

    let start = R.compose(
        R.join('\r\r'),
        R.map(buildMethod),
        R.prop('methods')
    );

    let ret = start(aClass);
    return ret;
}

var buildField = translatorMgr.find('field').translate;

var buildFields = R.compose(R.join('\r'), R.map(buildField), R.prop('fields'));

// var translate = R.converge(
//     render, 
//     [
//         R.prop('name'), 
//         buildFields, 
//         buildMethods, 
//         R.prop('superClass'),
//         R.prop('type')
//     ]
// );

var translateClass = R.converge(
    renderClass, 
    [
        R.prop('name'), 
        buildFields, 
        buildMethods, 
        R.prop('superClass')
    ]
);

var translateInterface = R.converge(
    renderInterface, 
    [
        R.prop('name'), 
        buildMethods, 
        R.prop('superClass')
    ]
);

var translate = function (model) {
    if('interface' == model.type) {
        return translateInterface(model);
    }
    else {
        return translateClass(model);
    }
}

exports.translate = translate;