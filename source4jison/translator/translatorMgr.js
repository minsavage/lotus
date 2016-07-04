/**
 * Created by danney on 16/6/25.
 */
var map = null;

var getMap = function () {
    return {
        'field': require('./field'),
        'method': require('./method'),
        'codeBlock': require('./codeBlock')
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

exports.find = find;