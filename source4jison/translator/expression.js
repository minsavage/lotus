/**
 * Created by danney on 16/6/26.
 */
var translatorMgr = require('./translatorMgr');

var translate = function (env, ast) {
    var exp = ast.expression;
    var translate = translatorMgr.find(exp.type).translate;
    var ret = translate(env, exp);
    return ret;
}

exports.translate = translate;