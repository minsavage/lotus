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

var renderClass = function(name, fields, methods, superClass, type) {
    if(strUtil.isNotEmpty(superClass)) {
        superClass = 'extends ' + superClass;
    }

    if(R.isNil(type)) {
        type = 'class';
    }

    let cotent = [fields, methods];
    let makeContent = R.compose(R.join('\r'), R.filter(x=>strUtil.isNotEmpty(x)));
    let contentStr = makeContent([fields, methods]);

    var tpl = 'public {{class}} {{name}} {{superClass}}\r{\r {{content}} \r}'
    return mustache.render(tpl, {
        class: type,
        name: name,
        content: contentStr,
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

var fieldParser = translatorMgr.find('field');

let parseFields = function (aClass) {
    let parseField = fieldParser.parse(createEnv(aClass));
    let start = R.compose(R.join('\r'), R.map(parseField), R.prop('fields'));
    return start(aClass);
}

var translateClass = R.converge(
    renderClass, 
    [
        R.prop('name'), 
        parseFields, 
        buildMethods, 
        R.prop('superClass'),
        R.prop('type')
    ]
);

// var translateInterface = R.converge(
//     renderInterface, 
//     [
//         R.prop('name'), 
//         buildMethods, 
//         R.prop('superClass')
//     ]
// );

// var translate = function (model) {
//     if('interface' == model.type) {
//         return translateInterface(model);
//     }
//     else {
//         return translateClass(model);
//     }
// }

let translate = translateClass;

exports.translate = translate;