/**
 * Created by danney on 16/1/26.
 */
var stringUtil = require('./stringUtil');

var pageToActivityName = function(name) {
    return stringUtil.withoutSuffix(name, 'Page') + 'Activity';
}

var vcToXmlFileName = function(name) {
    var str = stringUtil.withoutSuffix(name, 'ViewController');
    return 'vc_' + stringUtil.toLowerCaseWithUnderline(str);
}

var vcToBindingName = function(name) {
    var str = stringUtil.withoutSuffix(name, 'ViewController');
    return 'Vc' + str + 'Binding';
}

exports.pageToActivityName = pageToActivityName;
exports.vcToXmlFileName = vcToXmlFileName;
exports.vcToBindingName = vcToBindingName;