/**
 * Created by danney on 16/1/20.
 */
var util = require('util');
var extend = util._extend;

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

var clone = function(obj) {
    return extend({}, obj);
}

var deepClone = function(obj) {
    var Constructor = obj.constructor;
    var dest = new Constructor();
    return extend(dest, obj);
}

var combine = function(dest, src) {
    var destClone = clone(dest);
    combineInternal(destClone, src);
    return destClone;
}

var combineInternal = function(dest, src) {
    for(var k in src) {
        if(util.isObject(dest[k])) {
            combineInternal(dest[k], src[k])
        }
        else {
            dest[k] = src[k];
        }
    }
    return dest;
}

exports.clone = clone;
exports.deepClone = deepClone;
exports.getSize = getSize;
exports.combine = combine;