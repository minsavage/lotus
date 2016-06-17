/**
 * Created by danney on 16/2/13.
 */
var lotus = require('../../../lotus');
var objUtil = lotus.util.objectUtil;
var builderMgr = lotus.builderMgr;

module.exports = function() {
    var view = builderMgr.queryWidgetLayoutBuildConfig('View');

    return objUtil.combine(view, {
        typeGenerateRules : 'WebView',

        propertyGenerateRules: {
            replace: {
                content: 'app:{{key}}="{{value}}"'
            }
        }
    });
}