'use strict'
let R = require('ramda');
let mustache = require('mustache');

let translateMethod = (method)=>{
    let tpl = '{{name}}({{params}}) {\r {{body}} \r}'

    let params = R.join(', ', method.parameters);
    return mustache.render(tpl, {
        name: method.name,
        params: params,
        body: method.body
    });
}

module.exports = translateMethod;