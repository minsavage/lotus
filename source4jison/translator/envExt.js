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

    var findInClass = R.compose(
        R.find(R.propEq('name', name)),
        R.prop('fields')
    );

    var info = findInLocal(env);
    if(R.isNil(info)) {
        info = findInClass(aClass);
    }

    var type = R.path(['type'], info)
    if(R.isNil(type)) {
        return null;
    }

    var reg = '^((\\w+|\\$)\\.)?(\\w+\\.)*(item)$'.replace('item', type);
    reg = new RegExp(reg);

    var fullType = R.find((x)=>reg.test(x), aClass.import)
    return classLoader.load(fullType);
}

exports.createEnv = createEnv;
exports.add = add;
exports.find = find;