/**
 * Created by danney on 16/1/15.
 */

var map = {
    'int': 'Integer',
    'string': 'String',
    'bool': 'Boolean'
}

var translate = function(typeName) {
    return map[typeName];
}

exports.translate = translate;