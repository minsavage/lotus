/**
 * Created by danney on 16/6/26.
 */
'use strict'
var R = require('ramda');
var translatorMgr = require('./translatorMgr');
var classTranslatorMgr = require('./classTranslatorMgr');
var envExt = require('./envExt');

var translate = function (env, ast, isSetter) {
    let object = ast.object;
    let property = ast.property;

    let objName = null;
    let objType = null;

    if(object.type == 'Identifier') {
        objType = envExt.find(env, object.name);
        objName = object.name;
    }
    else {
        let translate = translatorMgr.find(object.type).translate;
        let ret = translate(env, object);
        objName = ret[0];
        objType = ret[1];
    }

    let classTranslatorMgr = require('./classTranslatorMgr');
    let classTranslator = classTranslatorMgr.find(objType.fullName);
    let ret = translator.translateFiled(objType, objName, property.name, isSetter);

    // var ret = null;
    // if(isMethod(objType, property.name)) {
    //     ret = classTranslator.translateMethod(objType, objName, property.name);
    // }
    // else {
        
    // }

    // var translator = require('./javaClassTranslator');
    // var ret = translator.translateFiled(objType, objName, property.name, isSetter);
    return ret;
}

// var translateMethod = function (env, ast) {
//     var ret = translatorMgr.findAndTranslate(env, ast);
//     var classTranslator = classTranslatorMgr.find(objType.fullName);
//     ret = classTranslator.translateMethod(objType, objName, property.name, []);
// }

// var isMethod = function (objType, propertyName) {
//     var findFieldInClass = R.compose(
//         R.find(R.propEq('name', propertyName)),
//         R.prop('fields')
//     );

//     var findMethodInClass = R.compose(
//         R.find(R.propEq('name', propertyName)),
//         R.prop('methods')
//     );

//     if(!R.isNil(findFieldInClass(objType))) {
//         return false;
//     }

//     if(!R.isNil(findMethodInClass(objType))) {
//         return true;
//     }

//     throw 'can not find property in class: ' + propertyName;
// }

exports.translate = translate;