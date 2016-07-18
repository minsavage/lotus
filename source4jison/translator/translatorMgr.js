/**
 * Created by danney on 16/6/25.
 */
'use strict'
var map = null;

var getMap = function () {
    return {
        'system.type.HashMap': require('./hashMap')
    }
}

var defaultTranslator = require('./default');

var find = function (className) {
    if(map == null) {
        map = getMap();
    }

    var translator = map[className];
    if(translator == undefined || translator == null) {
        return defaultTranslator;
    }
    else {
        return translator;
    }
}

exports.find = find;