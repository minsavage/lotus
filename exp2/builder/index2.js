/**
 * Created by danney on 15/12/4.
 */
var fs = require('fs');
var model = require('../viewController/mainViewController');


var packname = 'com.example.danney.mvvmtest';

var XmlBuilder = require('./layoutBuilder/xmlBuilder');
var xmlBuilder = new XmlBuilder();
xmlBuilder.build(model, packname);


//var ViewControllerBuilder = require('./viewControllerBuilder')
//viewControllerBuilder = new ViewControllerBuilder();
//var ret1 = viewControllerBuilder.parse(packname, model);

var ViewBuilder = require('./viewController/builder/viewBuilder');
var viewBuilder = new ViewBuilder();

var build = function(model) {
    codeFragments.push(viewBuilder.parse(model))
    if(model.units != undefined || model.units != null) {
        for(var k in model.units) {
            var ret = build(model.units[k])
            codeFragments.push(ret)
        }
    }
}

var codeFragments = [];
build(model.content);

ret1 = JSON.stringify(codeFragments);



fs.writeFile('../output/MainViewController.java', ret1, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
    console.log(ret1);
});

