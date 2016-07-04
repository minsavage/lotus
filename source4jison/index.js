/**
 * Created by danney on 16/6/25.
 */


var stringify = require('./util/stringify');

var model = require('../project/ich0521/viewController/postsViewController');
var str = stringify(model);

var comment = require('../project/ich0521/model/comment');
var modelStr = stringify(comment);

var parser = require("./parser/viewController").parser;
var ret = parser.parse(str);

//var modelParser = require("./parser/model").parser;
//var modelRet = modelParser.parse(modelStr);


var operatorModel = require('../project/ich0521/operator/postsOperator');
var operatorModelStr = stringify(operatorModel);

var operatorParser = require("./parser/operator").parser;
var modelRet = operatorParser.parse(operatorModelStr);

console.log(modelRet);

//var translator = require('./translator/class');
//var ret = translator.translate(ret);
//
//var fs = require('fs');
//fs.writeFileSync('test.java', modelRet);

//console.log(ret);