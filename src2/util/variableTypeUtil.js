/**
 * Created by danney on 16/1/15.
 */

var map = {
    'int': 'Integer',
    'string': 'String',
    'bool': 'boolean',
    'date': 'Date'
}

var getType = function(typeName) {
    var type = map[typeName];
    if(type == undefined || type == null) {
        return typeName;
    }
    else {
        return type;
    }
}

var getTypeDefaultValue = function(typeName) {
    if(typeName == 'string') {
        return 'null';
    }
    else if(typeName == 'int' || typeName == 'long') {
        return '-1';
    }
    else if(typeName == 'bool') {
        return 'false';
    }
    else {
        null;
    }
}

var isModel = function(typeName) {
    var modelMgr = require('../lotus').modelMgr;
    var models = modelMgr.getModels();
    for(var k in models) {
        var model = models[k];
        if(model.type == typeName) {
            return true;
        }
    }
    return false;
}

var queryImport = function(typeName) {
    if(typeName == 'date') {
        return 'java.util.Date';
    }
    else {
        return '';
    }
}

exports.getType = getType;
exports.getTypeDefaultValue = getTypeDefaultValue;
exports.isModel = isModel;
exports.queryImport = queryImport;