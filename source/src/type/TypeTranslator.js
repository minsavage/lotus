/**
 * Created by danney on 16/6/8.
 */
'use strict'

var lotus = require('../lotus');
var codeGenerateUtil = lotus.util.codeGenerateUtil;

class TypeTranslator {
    constructor() {
        this.nativeName = '';
    }

    getNativeName() {
        return this.nativeName;
    }

    generateVariableDeclaration(objName) {
        return this.getNativeName() + ' ' + objName;
    }

    generateProperty(objName, setterNotify) {
        var name = objName;
        var type = this.getNativeName();

        var ret = '';
        ret += codeGenerateUtil.generateMemberVariable(type, name) + '\r\r';
        ret += codeGenerateUtil.generateGetter(type, name) + '\r\r';
        if(setterNotify == true) {
            ret += codeGenerateUtil.generateSetterWithNotify(type, name);
        }
        else {
            ret += codeGenerateUtil.generateSetter(type, name);
        }

        return ret;
    }

    generateInitializer(objName, value) {
        throw 'not implemented method';
    }
}

module.exports = TypeTranslator;