/**
 * Created by danney on 16/7/1.
 */
var R = require('ramda');
var Class = require('../type/class');
var classLoader = require('../type/classLoader');

var createEnv = R.concat([]);

var add = function (env, local) {
    return R.concat(local, env);
}

var find = function (env, name) {
    var aClass = R.takeLast(1, env)[0];
    if(!(aClass instanceof Class)) {
        throw 'there is no class in env';
    }

    var findInLocal = R.find(R.propEq('name', name));

    var info = null;
    var isFromImport = false;
    var fullType = null;

    do {
        info = findInLocal(env);
        if(!R.isNil(info)) {
            break;
        }

        info = findInClass(name, aClass);
        if(!R.isNil(info)) {
            break;
        }

        fullType = findInImport(name, aClass);
        if(R.isNil(fullType)) {
            return null;
        }
    } while (0);

    if(fullType == null) {
        var type = R.path(['type'], info)
        if(R.isNil(type)) {
            return null;
        }

        if(classLoader.isBuiltInType(type)) {
            fullType = type;
        }
        else {
            fullType = findInImport(type, aClass);
        }
    }

    if(fullType == null) {
        return null;
    }

    return classLoader.load(fullType);
}

var findInClass = function (name, aClass) {
    var findFieldInClass = R.compose(
        R.find(R.propEq('name', name)),
        R.prop('fields')
    );

    var findMethodInClass = R.compose(
        R.find(R.propEq('name', name)),
        R.prop('methods')
    );

    var ret = findFieldInClass(aClass);
    if(R.isNil(ret)) {
        ret = findMethodInClass(aClass);
    }
    return ret;
}



var findInImport = function (typeName, aClass) {
    var reg = '^((\\w+|\\$)\\.)?(\\w+\\.)*(item)$'.replace('item', typeName);
    reg = new RegExp(reg);

    var fullType = R.find((x)=>reg.test(x), aClass.import)
    return fullType;
}



exports.createEnv = createEnv;
exports.add = add;
exports.find = find;