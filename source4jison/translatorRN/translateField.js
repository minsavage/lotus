'use strict'
let R = require('ramda');
let mustache = require('mustache');
let strUtil = require('../util/strUtil');

let translateField = (field)=>{
    let name = field.name;
    if(field.annotations instanceof Array) {
        let annos = R.join(' ', field.annotations);
        if(strUtil.isNotEmpty(annos)) {
            name = annos + ' ' + name;
        }
    }

    let def = field.defaultValue;
    if(def instanceof Array) {
        def = '[]';
    }

    return name + ' = ' + def + ';'
}

module.exports = translateField;