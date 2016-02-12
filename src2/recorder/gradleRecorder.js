/**
 * Created by danney on 16/2/5.
 */
var util = require('util');
var extend = require('util')._extend;

var GradleRecorder = function() {
    this.project= {

    };

    this.app = {
        dependencies: {
            compile: []
        }
    };

    this.setting = {
        include: []
    }
}

GradleRecorder.prototype.addAll = function(recorder) {
    combine(recorder.app, this.app);
    combine(recorder.setting, this.setting);
}

var combine = function(src, dest) {
    if(typeof src != typeof dest) {
        throw 'type is not equals';
    }

    if(util.isArray(src)) {
        for(var k in src) {
            dest.push(src[k]);
        }
    }
    else if(util.isObject(src)) {
        for(var k in src) {
            var srcV = src[k];
            var destV = dest[k];
            if(util.isNullOrUndefined(destV)) {
                dest[k] = srcV;
            }
            else {
                combine(srcV, destV);
            }
        }
    }
}

module.exports = GradleRecorder;