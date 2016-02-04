/**
 * Created by danney on 16/1/24.
 */
module.exports = {
    namespace: 'fresco',

    typeGenerateRules : 'com.facebook.drawee.view.SimpleDraweeView',

    propertyGenerateRules: {
        default: 'android:{{key}}="{{value}}"',

        replace: {
            id: 'android:{{key}}="@+id/{{value}}"',
            actualImageScaleType: 'fresco:{{key}}="{{value}}"'
        },

        ignore: {
            uri: true
        }
    }
}