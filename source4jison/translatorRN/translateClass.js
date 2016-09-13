'use strict'
let R = require('ramda');
let mustache = require('mustache');
let strUtil = require('../util/strUtil');
let translateField = require('./translateField');
let translateMethod = require('./translateMethod');

let translate = function(classModel) {
    let importLines = translateImport(classModel);
    let methods = translateMethods(classModel);
    let fields = translateFields(classModel);
    let content = fields + '\r\r' + methods;

    let prefix = '';
    if(strUtil.isNotEmpty(importLines)) {
        prefix += importLines + '\r\r';
    }

    if(classModel.annotations.length > 0) {
        prefix += R.join(' ', classModel.annotations) + '\r'
    }
    
    if(classModel.modifiers.length > 0) {
        prefix += R.join(' ', classModel.modifiers);
    }

    let tpl = '{{prefix}} class {{name}} {\r {{content}} \r}'

    return mustache.render(tpl, {
        prefix: prefix,
        name: classModel.name,
        content: content 
    }).trim();
}

let translateMethods = R.compose(
    R.join('\r\r'), 
    R.map(translateMethod),
    R.prop('methods')
);

let translateFields = R.compose(
    R.join('\r'), 
    R.map(translateField),
    R.prop('fields')
);


let translateImport = (model)=> {
    let makeImportNative = R.compose(R.join('\r'), R.map((x)=>'import ' + x));

    let lines = '';
    if(model.importNative instanceof Array) {
        lines += makeImportNative(model.importNative);
    }
    return lines;
}

module.exports = translate;