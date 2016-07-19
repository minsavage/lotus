/**
 * Created by danney on 16/6/25.
 */
'use strict'
let R = require('ramda');
let mustache = require('mustache');
let parserMgr = require('./parserMgr');
let strUtil = require('../util/strUtil');
let createEnv = require('./envExt').createEnv;
let addEnv = require('./envExt').add;
let translatorMgr = require('../translator/translatorMgr');

let render = function(name, fields, methods, superClass, type) {
    if(strUtil.isNotEmpty(superClass)) {
        name = R.join(' extends ', [name, superClass]);
    }

    if(R.isNil(type)) {
        type = 'class';
    }

    let content = R.trim(fields + '\r' + methods);

    let tpl = 'public {{class}} {{name}} {\r {{content}} \r}'
    return mustache.render(tpl, {
        class: type,
        name: name,
        content: content,
        superClass: superClass
    })
}

let parseMethods = function(aClass) {
    let methodTranslator = parserMgr.find('method');
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

    let parseMethod = function (method) {
        let args = methodArgs(method);
        let curEnv = addEnv(env, args);
        return translate(method, curEnv);
    }

    let start = R.compose(
        R.join('\r\r'),
        R.map(parseMethod),
        R.prop('methods')
    );

    let ret = start(aClass);
    return ret;
}

let parseFields = function (aClass) {
    let fieldParser = parserMgr.find('field');
    let parseField = fieldParser.parse(createEnv(aClass));
    let start = R.compose(R.join('\r'), R.map(parseField), R.prop('fields'));
    return start(aClass);
}

let parseImport = function (importLines) {
    let mapImport = function(line){
        let translator = translatorMgr.find(line);
        translator.translateImport(line);
    }

    let ret = R.map(mapImport, importLines);
    return ret;
}

let parse = R.converge(
    render, 
    [
        R.prop('name'),
        parseFields, 
        parseMethods,
        R.prop('superClass'),
        R.prop('type')
    ]
);

exports.parse = parse;