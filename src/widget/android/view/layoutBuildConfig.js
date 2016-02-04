/**
 * Created by danney on 16/1/24.
 */
module.exports = {
    typeGenerateRules : '{{value}}',

    propertyGenerateRules: {
        default: 'android:{{key}}="{{value}}"',

        replace: {
            id: 'android:{{key}}="@+id/{{value}}"'
        },

        ignore: {
            type: true,
            event: true
        }
    }
}