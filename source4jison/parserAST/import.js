'use strict'
let R = require('ramda');
let translatorMgr = require('../translator/translatorMgr');

let parse = function (pkgName, importLines) {
    let mapImport = function(line){
        let translator = translatorMgr.find(line);
        let i = translator.translateImport(pkgName, line);
        return 'import ' + i + ';';
    }

    let ret = R.map(mapImport, importLines);
    return R.join('\r', ret);
}

exports.parse = parse;