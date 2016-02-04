/**
 * Created by danney on 16/1/26.
 */
var stringUtil = require('./stringUtil');

var getPageName = function(name) {
    return stringUtil.withoutSuffix(name, 'Page') + 'Activity';
}

exports.getPageName = getPageName;