/**
 * Created by danney on 15/11/23.
 */
var model = require('../viewController/mainViewController');
var LayoutBuilder = require('./layoutBuilder')
var builder = new LayoutBuilder();
var pd = require('pretty-data2').pd;
var beautify = require('js-beautify').html_beautify;

var ret = builder.parse(model);
//ret = pd.xml(ret);
ret = beautify(ret);

var fs = require('fs');

fs.writeFile('../output/layout.xml', ret, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});


//
//console.log('---------------final--------------');
//console.log(ret);



