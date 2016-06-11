/**
 * Created by danney on 16/6/3.
 */
'use strict';

var Class = require('./class');
var TemplateClass = require('./templateClass');
var util = require('util');
var lotus = require('../lotus');
var objectUtil = lotus.util.objectUtil;

class ClassMgr {
    constructor() {
        this.map = {};
        this.init();
    }

    add(name, c) {
        this.map[name] = c;
    }

    find(name) {
        if(this.isTemplateClass(name)) {
            return this.instanceTemplateClass(name);
        }
        else {
            return this.map[name];
        }
    }

    isTemplateClass(name) {
        var reg = /^(\w*)<(.*)>$/g;
        return reg.test(name);
    }

    instanceTemplateClass(name) {
        var className = RegExp.$1;
        var c = this.map[className];
        if(util.isNullOrUndefined(c)) {
            return null;
        }

        if(!(c instanceof TemplateClass)) {
            throw 'type [' + c + '] is not a template class';
        }

        var tList = RegExp.$2.split('.');

        var instantiatedClass = objectUtil.deepClone(c);
        instantiatedClass.tList = [];
        for(var k in tList) {
            var type = tList[k].trim();
            if(util.isNullOrUndefined(this.map[type])) {
                throw 'do not supported type [' + type + '] for template class, do you forget importing it ?';
            }
            instantiatedClass.tList.push(this.map[type]);
        }

        if(instantiatedClass.tList.length != instantiatedClass.tSize) {
            throw 'too much template arguments in ' + name;
        }

        instantiatedClass.translator.tList = instantiatedClass.tList;
        instantiatedClass.translator.tSize = instantiatedClass.tSize;

        return instantiatedClass;
    }

    init() {
        var intType = new Class();
        intType.name = 'int';
        intType.isPrimitive = true;
        var Translator = require('./translator/intTranslator');
        intType.translator = new Translator();

        var stringType = new Class();
        stringType.name = 'string';
        stringType.isPrimitive = true;
        Translator = require('./translator/stringTranslator');
        stringType.translator = new Translator();

        var boolType = new Class();
        boolType.name = 'bool';
        boolType.isPrimitive = true;
        Translator = require('./translator/boolTranslator');
        boolType.translator = new Translator();

        this.map['int'] = intType;
        this.map['string'] = stringType;
        this.map['bool'] = boolType;
    }
}

module.exports = ClassMgr;