/**
 * Created by danney on 16/7/8.
 */
var strUtil = require('./strUtil');
var mustache = require('mustache');

var generateGetter = function(type, name, annotation) {
    var prefix = '';
    if(!util.isNullOrUndefined(annotation) && annotation != '') {
        prefix = annotation + '\r';
    }

    var tplStr = (type == 'bool') ? tpl.common.getBoolean : tpl.common.get;

    return prefix + mustache.render(tplStr, {
            type: variableTypeUtil.getType(type),
            name: stringUtil.firstCharacterToLowercase(name),
            nameWithFirstUppercase: stringUtil.firstCharacterToUppercase(name)
        });
}

var genGetterCaller = function(objName, propertyName) {
    if(strUtil.isEmpty(propertyName)) {
        throw 'property name can not be null'
    }

    /*
    * if objName != null, gen code:  audio.getName()
    * else gen code:  getName()
    * */
    var tpl = ''
    if(strUtil.isNotEmpty(propertyName)) {
        tpl = '{{obj}}.get{{prop}}()'
    }
    else {
        tpl = 'get{{prop}}()'
    }

    return mustache.render(tpl, {
        obj: objName,
        prop: strUtil.firstCharToUppercase(propertyName)
    })
}

exports.genGetterCall = genGetterCaller;