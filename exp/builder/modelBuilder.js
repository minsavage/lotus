/**
 * Created by danney on 16/1/15.
 */
var mustache = require('mustache');
var tpl = require('./template');
var javaTypeTranslator = require('../util/javaTypeTranslator');
var javaNameUtil = require('../util/javaNameUtil');

var ModelBuilder = function() {}

ModelBuilder.prototype.parse = function(model) {
    if(model.name == undefined || model.name == null) {
        console.log('model.name == null');
        return;
    }

    var className = javaNameUtil.firstCharacterToUppercase(model.name);
    var properties = model.properties;

    var result = '';
    for(var k in  properties) {
        var p = properties[k];
        var name = p.name;
        var type = p.type;

        var javaType = javaTypeTranslator.translate(type);
        var firstCharacterWithUpperCase = javaNameUtil.firstCharacterToUppercase(name);


        var ret = javaType + ' ' + name + ';\r\r';

        var getTpl;
        if(type == 'bool') {
            getTpl = tpl.model.getBoolean;
        }
        else {
            getTpl = tpl.model.get;
        }

        ret += mustache.render(getTpl, {
            type: javaType,
            name: name,
            nameWithFirstUppercase: firstCharacterWithUpperCase
        }) + '\r\r';

        ret += mustache.render(tpl.model.set, {
                type: javaType,
                name: name,
                nameWithFirstUppercase: firstCharacterWithUpperCase
        }) + '\r\r';

        result += ret;
    }

    return mustache.render(tpl.model.main, {
        content: result,
        className: className,
        packageName: '111'
    });
}

module.exports = ModelBuilder;