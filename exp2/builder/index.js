/**
 * Created by danney on 15/11/23.
 */
var model = require('../viewController/mainViewController');
var beautify = require('js-beautify').html_beautify;
var fs = require('fs');


//var LayoutBuilder = require('./layoutBuilder')
//var builder = new LayoutBuilder();
//var ret = builder.parse(model);
//ret = beautify(ret);
//fs.writeFile('../output/layout.xml', ret, function (err) {
//    if (err) throw err;
//    console.log('It\'s saved!');
//});

var ViewControllerBuilder = require('./viewControllerBuilder')
viewControllerBuilder = new ViewControllerBuilder();
var ret1 = viewControllerBuilder.parse('com.soundario.dreamcloud', model);

fs.writeFile('../output/MainViewController.java', ret1, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});