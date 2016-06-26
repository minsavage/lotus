/**
 * Created by danney on 16/6/25.
 */

var map = {
    'field': require('./field'),
    'method': require('./method')
}

var find = function (name) {
    var translator = map[name];
    if(translator == undefined || translator == null) {
        return null;
    }
    else {
        return translator;
    }
}

exports.find = find;