/**
 * Created by danney on 15/12/4.
 */
var fs = require('fs');
var model = require('../viewController/mainViewController');


//var XmlBuilder = require('./layoutBuilder/xmlBuilder');
//var xmlBuilder = new XmlBuilder();
//xmlBuilder.build(model, 'com.soundario.dreamcloud');


var ViewControllerBuilder = require('./viewControllerBuilder')
viewControllerBuilder = new ViewControllerBuilder();
var ret1 = viewControllerBuilder.parse('com.soundario.dreamcloud', model);

fs.writeFile('../output/MainViewController.java', ret1, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});