/**
 * Created by danney on 16/6/25.
 */
'use strict'

var map = null;

var getMap = function () {
    return {
        'field': require('./field'),
        'method': require('./method'),
        'codeBlock': require('./codeBlock'),
        'ExpressionStatement': require('./expression'),
        'CallExpression': require('./callExpression')
    }
}

var find = function (name) {
    if(map == null) {
        map = getMap();
    }

    var translator = map[name];
    if(translator == undefined || translator == null) {
        return null;
    }
    else {
        return translator;
    }
}

class x {
    constructor() {
        this.f = null;
    }

    f() {

    }
}

exports.find = find;