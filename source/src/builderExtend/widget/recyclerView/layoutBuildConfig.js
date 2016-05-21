/**
 * Created by danney on 16/5/19.
 */
var lotus = require('../../../lotus');
var objUtil = lotus.util.objectUtil;
var builderMgr = lotus.builderMgr;

module.exports = function() {
    var view = builderMgr.queryWidgetLayoutBuildConfig('View');

    return objUtil.combine(view, {
        typeGenerateRules : 'android.support.v7.widget.RecyclerView',

        propertyGenerateRules: {
            ignore: {
                adapter: true
            }
        }
    });
}