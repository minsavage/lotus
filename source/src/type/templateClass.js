/**
 * Created by danney on 16/6/3.
 */
'use strict'
var lotus = require('../lotus');
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var Class = require('./class');

class TemplateClass extends Class{
    constructor() {
        super();
        this.tSize = 0;
        this.tList = [];
    }

    getInstantiatedName() {
        var str = '';
        for(var k in this.tList) {
            var t = this.tList[k];
            str += t + ', ';
        }

        var n = str.indexOf(', ');
        if(n >= 0) {
            str = str.substr(0, str.length-2);
        }
        return this.name + '<' + str + '>';
    }
    //
    //generateVariableDeclaration(objName) {
    //    return this.translator.generateVariableDeclaration(objName);
    //}
    //
    //generateProperty(objName) {
    //    return this.translator.generateProperty(objName);
    //}
}

module.exports = TemplateClass;