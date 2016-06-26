/**
 * Created by danney on 16/6/25.
 */


var stringify = function(obj, prop) {
    var placeholder = '____PLACEHOLDER____';
    var fns = [];
    var json = JSON.stringify(obj, function(key, value) {
        if (typeof value === 'function') {
            fns.push(value);
            return placeholder;
        }
        return value;
    }, 2);
    json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function(_) {
        return fns.shift();
    });

    return json;
    //return 'this["' + prop + '"] = ' + json + ';';
};

var model = require('../project/ich0521/viewController/postsViewController');
var str = stringify(model);

var parser = require("./parser/viewController").parser;
var ret = parser.parse(str);

//console.log(ret);

var translator = require('./translator/class');
var ret = translator.translate(ret);

var fs = require('fs');
fs.writeFileSync('test.java', ret);

//console.log(ret);