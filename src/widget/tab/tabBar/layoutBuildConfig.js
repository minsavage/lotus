/**
 * Created by danney on 16/1/24.
 */
module.exports = {
    typeGenerateRules : 'RadioGroup',

    propertyGenerateRules: {
        default: 'android:{{key}}="{{value}}"',

        replace: {
            id: 'android:{{key}}="@+id/{{value}}"',
            layout_above: 'android:{{key}}="@+id/{{value}}"'
        }
    }
}