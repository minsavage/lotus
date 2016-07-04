/**
 * Created by danney on 16/7/2.
 */
module.exports = stringify = function (obj, prop) {
    var placeholder = '____PLACEHOLDER____';
    var fns = [];
    var json = JSON.stringify(obj, function(key, value) {
        if (typeof value === 'function') {
            var x = value.toString().replace(/\r|\n/g, '');
            fns.push(x);
            return placeholder;
        }
        return value;
    }, 2);
    //json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function(_) {
    //    return fns.shift();
    //});

    json = json.replace(new RegExp(placeholder, 'g'), function(_) {
        return fns.shift();
    });

    return json;
    //return 'this["' + prop + '"] = ' + json + ';';
}