/**
 * Created by danney on 15/11/25.
 */
var jspt = require('jsparse-tools');
var esprima = require('esprima');

var src = 'var answer = 6 * 7; test.show(xxx)';

var ret = esprima.parse(src);
//console.log(ret);
console.log(JSON.stringify(ret, null, 4));

//
////var src = 'var x = 10;\nconsole.log("testing");';
//
//
////jspt.lexscope('var x = 10;\nconsole.log("testing");');
//
//jspt.astwalk(src, function(node){
//    console.log(node);
//});
