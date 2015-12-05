/**
 * Created by danney on 15/12/4.
 */
var fs = require('fs');
var DataBindingBuilder = require('./dataBindingBuilder');

var XmlBuilder = function() {

}

XmlBuilder.prototype.build = function(model, packageName) {
    var dataBindingBuilder = new DataBindingBuilder();
    dataBindingBuilder.packageName = packageName;
    var ret = dataBindingBuilder.parse(model);

    fs.writeFile('../output/MainView.xml', ret, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

module.exports = XmlBuilder;