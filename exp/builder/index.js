/**
 * Created by danney on 15/11/23.
 */
var model = require('../viewController/mainViewController');
var LayoutBuilder = require('./layoutBuilder')
var builder = new LayoutBuilder();

var ret = builder.parse(model);
console.log(ret);