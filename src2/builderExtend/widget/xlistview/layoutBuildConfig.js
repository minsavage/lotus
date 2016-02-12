/**
 * Created by danney on 16/1/24.
 */
module.exports = {
    namespace: 'PullToRefresh',

    typeGenerateRules : 'com.handmark.pulltorefresh.library.PullToRefreshListView',

    propertyGenerateRules: {
        default: 'android:{{key}}="{{value}}"',

        replace: {
            id: 'android:{{key}}="@+id/{{value}}"',
            ptrMode: 'PullToRefresh:{{key}}="{{value}}"'
        },

        ignore: {
            adapter: true
        }
    }
}