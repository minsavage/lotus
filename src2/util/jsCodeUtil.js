/**
 * Created by danney on 16/2/16.
 */
var mustache = require('mustache');

var generateStringToType = function(input, output, type) {
    if(type == 'int') {
        var tpl = '{{output}} = parseInt({{input}});'
        return mustache.render(tpl, {
            input: input,
            output: output
        })
    }
    else {
        return '';
    }
}

var generateIsNullForType = function(input, type) {
    if(type == 'int') {
        var tpl = 'isNaN({{input}})'
        return mustache.render(tpl, {input: input})
    }
    else {
        var tpl = 'util.isNullOrUndefined({{input}})'
        return mustache.render(tpl, {input: input})
    }
}


exports.generateStringToType = generateStringToType;
exports.generateIsNullForType = generateIsNullForType;