/**
 * Created by danney on 16/7/8.
 */
var R = require('ramda');
var findTypeInEnv = require('./envExt').find;
var createEnv = require('./envExt').createEnv;
var codeGenUtil = require('../util/codeGenUtil');

var translateFiled = function (objClass, objName, fieldName, isSetter) {
    var env = createEnv(objClass);
    var fieldType = findTypeInEnv(env, fieldName);
    if(fieldType.isProperty == true) {
        return codeGenUtil.genGetterCall(objName, fieldName)
    }
    else {
        return objName + '.' + fieldName;
    }
}

exports.translateFiled = translateFiled;