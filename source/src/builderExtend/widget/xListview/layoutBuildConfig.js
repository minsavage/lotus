/**
 * Created by danney on 16/2/13.
 */
var lotus = require('../../../lotus');
var objUtil = lotus.util.objectUtil;
var builderMgr = lotus.builderMgr;

module.exports = function() {
    var view = builderMgr.queryWidgetLayoutBuildConfig('View');  //require('../android/view/layoutBuildConfig')

    return objUtil.combine(view, {
        namespace: 'PullToRefresh',

        typeGenerateRules : 'com.handmark.pulltorefresh.library.PullToRefreshListView',

        propertyGenerateRules: {
            replace: {
                ptrMode: 'PullToRefresh:{{key}}="{{value}}"'
            },

            ignore: {
                adapter: true
            }
        }
    });
}