/**
 * Created by danney on 16/1/20.
 */
var util = require('util');

var getSize = function(obj) {
    if(util.isObject(obj)) {
        var count = 0;
        for(var k in obj) {
            count++;
        }
        return count;
    }
    else if(util.isArray(obj)) {
        return obj.length;
    }
    else if(util.isString(obj)) {
        return obj.length;
    }
    else {
        return -1;
    }
}

exports.getSize = getSize;