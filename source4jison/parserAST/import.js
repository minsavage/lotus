'use strict'
let R = require('ramda');
let translatorMgr = require('../translator/translatorMgr');

let parse = function (pkgName, importLines, importNativeLines) {
    let mapImport = function(line){
        let translator = translatorMgr.find(line);
        let i = translator.translateImport(pkgName, line);
        return 'import ' + i + ';';
    }

    let mapNativeImport = function(line){
        return 'import ' + line + ';';
    }

    let ret = R.map(mapImport, importLines);
    let retNative = R.map(mapNativeImport, importNativeLines);
    ret = R.join('\r', ret);
    retNative = R.join('\r', retNative);
    return ret + '\r' + retNative;
}

exports.parse = parse;