/**
 * Created by danney on 16/7/8.
 */
var R = require('ramda');
var findTypeInEnv = require('./envExt').find;
var createEnv = require('./envExt').createEnv;

var translateFiled = function (objClass, objName, fieldName) {
    var env = createEnv(objClass);
    var fieldType = findTypeInEnv(env, fieldName);
    if(fieldType.isProperty == true) {

    }
}

exports.translateFiled = translateFiled;