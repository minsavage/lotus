/**
 * Created by danney on 16/1/16.
 */
var util = require('util');
var mustache = require('mustache');
var path = require('path');
var tpl = require('../template')(path.resolve(__dirname, '../builder/template'));
var variableTypeUtil = require('./variableTypeUtil');
var stringUtil = require('./stringUtil');

var generateMemberVariable = function(type, name, isProtected) {
    var privateStr = isProtected ? 'protected': 'private';
    return privateStr + ' ' + variableTypeUtil.getType(type) + ' ' + stringUtil.firstCharacterToLowercase(name) + ';';
}

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

var generateSetter = function(type, name, annotation) {
    var prefix = '';
    if(!util.isNullOrUndefined(annotation) && annotation != '') {
        prefix = annotation + '\r';
    }

    return prefix + mustache.render(tpl.common.set, {
        type: variableTypeUtil.getType(type),
        name: stringUtil.firstCharacterToLowercase(name),
        nameWithFirstUppercase: stringUtil.firstCharacterToUppercase(name)
    });
}

var generateSetterWithNotify = function(type, name) {
    return mustache.render(tpl.common.setWithNotify, {
            type: variableTypeUtil.getType(type),
            name: stringUtil.firstCharacterToLowercase(name),
            nameWithFirstUppercase: stringUtil.firstCharacterToUppercase(name)
    });
}

var generateClass = function(packageName, subPackageName, importList, name, content) {
    return mustache.render(tpl.common.class, {
        packageName: packageName,
        subPackage: subPackageName,
        import: importList,
        className: name,
        content: content
    });
}

var generateSetterCall= function(objName, propertyName, value) {
    if(objName != null && objName != '') {
        objName += '.';
    }
    else {
        // 当objName 传入空值时，就不生成带对象的调用，这个用法可以用在对象内部调用时
        //e.g. :  setName("danney");
        objName = '';
    }

    return objName + 'set' + stringUtil.firstCharacterToUppercase(propertyName) + '(' + value + ');';
}

var generateGetterCall = function(objName, propertyName) {
    // audio.getName();
    if(objName != null && objName != '') {
        objName += '.';
    }
    else {
        // 当objName 传入空值时，就不生成带对象的调用，这个用法可以用在对象内部调用时
        //e.g. :  setName("danney");
        objName = '';
    }
    return objName + 'get' + stringUtil.firstCharacterToUppercase(propertyName) + '();';
}

var generateSPGetter = function(objName, type, key) {
    //e.g.: sp.getString("myKey", null);
    var realType;
    if(type == 'int') {
        realType = 'Int';
    }
    else {
        realType = variableTypeUtil.getType(type);
    }

    return objName + '.get' + realType +
        '("' + key + '", ' + variableTypeUtil.getTypeDefaultValue(type) + ');'
}

var generateSPSetter = function(objName, type, key, value) {
    //sp.putString("name", audio.getName());
    var realType;
    if(type == 'int') {
        realType = 'Int';
    }
    else {
        realType = variableTypeUtil.getType(type);
    }

    return objName + '.put' + realType + '("' + key + '", ' + value + ');'
}

var generateImport = function(packageName, subPackageName) {
    return 'import '+ packageName + '.' + subPackageName + ';';
}

var generateFindViewById = function(className, objname, viewName, id) {
    return objname + ' = (' + className + ')' + viewName + '.findViewById(R.id.' + id + ');';
}

var generateSwitchCase = function(switchName, ids, values) {
    var caseStr = ''
    for(var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var value = values[i];

        caseStr += 'case ' + id + ': { \r' + value + '\rbreak;\r' + '}\r'
    }

    return 'switch (' + switchName + ') {\r' + caseStr.trim() + '\r}';
}

var generateXml = function(tag, properties, content, hasDeclaration) {
    var pStr = '';
    for(var k in properties) {
        pStr += properties[k] + '\n';
    }

    if(stringUtil.isNotEmpty(pStr)) {
        pStr = '\n' + pStr.trim();
    }

    var template;
    if(stringUtil.isNotEmpty(content)) {
        template = '<{{tag}} {{properties}}>{{content}}</{{tag}}>'
    }
    else {
        template = '<{{tag}} {{properties}} />';
    }

    var declaration = '';
    if(hasDeclaration == true) {
        declaration = '<?xml version="1.0" encoding="utf-8"?>\n';
    }

    return declaration + mustache.render(template, {
        tag: tag,
        properties: pStr,
        content: content
    })
}
var generateActivityInManifest = function(name, isEntryPage) {
    var activityTpl = '<activity android:name="{{name}}">{{entry}}</activity>'
    var entryTpl = '<intent-filter> \r <action android:name="android.intent.action.MAIN" /> \r <category android:name="android.intent.category.LAUNCHER" /> \r</intent-filter>';

    var entry = ''
    if(isEntryPage == true) {
        entry = entryTpl;
    }

    return mustache.render(activityTpl, {
        name: name,
        entry: entry
    });
}

exports.generateClass = generateClass;
exports.generateMemberVariable = generateMemberVariable;
exports.generateGetter = generateGetter;
exports.generateSetter = generateSetter;
exports.generateSetterWithNotify = generateSetterWithNotify;
exports.generateSetterCall = generateSetterCall;
exports.generateGetterCall = generateGetterCall;
exports.generateSPGetter = generateSPGetter;
exports.generateSPSetter = generateSPSetter;
exports.generateImport = generateImport;
exports.generateFindViewById = generateFindViewById;
exports.generateSwitchCase = generateSwitchCase;
exports.generateXml = generateXml;
exports.generateActivityInManifest = generateActivityInManifest;