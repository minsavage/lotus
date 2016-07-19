/**
 * Created by danney on 16/6/25.
 */
'use strict'
var map = null;

var getMap = function () {
    return {
        'system.type.HashMap': require('./hashMap'),
        'system.type.Array': require('./Array'),
        'system.rx.Observable': require('./Observable')
    }
}

var defaultTranslator = require('./default');

var find = function (classFullName) {
    if(map == null) {
        map = getMap();
    }

    var translator = map[classFullName];
    if(translator == undefined || translator == null) {
        return defaultTranslator;
    }
    else {
        return translator;
    }
}

exports.find = find;