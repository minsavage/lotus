/**
 * Created by danney on 16/2/13.
 */
var lotus = require('../../../lotus');
var objUtil = lotus.util.objectUtil;
var builderMgr = lotus.builderMgr;

module.exports = function() {
    var view = builderMgr.queryWidgetLayoutBuildConfig('View');

    return objUtil.combine(view, {
        namespace: 'fresco',

        typeGenerateRules : 'com.facebook.drawee.view.SimpleDraweeView',

        propertyGenerateRules: {
            replace: {
                uri: 'app:{{key}}="{{value}}"',
                actualImageScaleType: 'fresco:{{key}}="{{value}}"'
            }
        }
    });
}