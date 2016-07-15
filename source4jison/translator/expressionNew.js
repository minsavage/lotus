var translatorMgr =require('./translatorMgr');

var translate = function (env, ast) {
    var ret = translatorMgr.findAndTranslate(env, ast.callee);
    var name = ret[0];
    var type = ret[1];
    
    var classTranslatorMgr = require('./classTranslatorMgr');
    var classTranslator = classTranslatorMgr.find(type.fullName);
    
    var ret = classTranslator.translateMethod(type, null, 'new');
    return ret;
}
exports.translate = translate;