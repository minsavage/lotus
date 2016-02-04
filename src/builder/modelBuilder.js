/**
 * Created by danney on 16/1/15.
 */
var mustache = require('mustache');
var tpl = require('../template')('./template');
var VariableTypeUtil = require('../util/VariableTypeUtil');
var stringUtil = require('../util/stringUtil');
var globalConfig = require('../globalConfig');

var ModelBuilder = function() {}

ModelBuilder.prototype.parse = function(model) {
    if(model.name == undefined || model.name == null) {
        console.log('model.name == null');
        return;
    }

    var className = stringUtil.firstCharacterToUppercase(model.name);
    var properties = model.properties;

    var result = '';
    for(var k in  properties) {
        var p = properties[k];
        var name = p.name;
        var type = p.type;

        var javaType = VariableTypeUtil.getType(type);
        var firstCharacterWithUpperCase = stringUtil.firstCharacterToUppercase(name);


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
        packageName: globalConfig.packageName
    });
}

module.exports = ModelBuilder;