/**
 * Created by danney on 15/11/30.
 */
var onClick = function() {
    var i = 0;
}

function onOpen() {
    var s = 1;
}

var s = onClick.toString();
console.log(s);
var p = s.lastIndexOf('}');
s = s.substring(0, p);

console.log(s);

s = s.replace('function () {', '').trim();

console.log(s);

console.log(onOpen.toString());