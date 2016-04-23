/**
 * Created by danney on 16/4/2.
 */
var util = require('util');

var fill = function(importRecorder, importList) {
    if(!util.isArray(importList)) {
        return;
    }

    for(var k in importList) {
        var str = importList[k];

        if(str.charAt(0) != '$') {
            importRecorder.addPlain(str);
        }
        else {
            var array = str.split('.');
            var type = array[1];
            var v = array[2];

            if(type == 'model') {
                importRecorder.addModel(v);
            }
            else if(type == 'enum') {
                importRecorder.addOther('enumeration.' + v);
            }
            else {
                var sub = str.substring(2);
                importRecorder.addOther(sub);
            }
        }
    }
}

exports.fill = fill;