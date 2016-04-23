/**
 * Created by danney on 16/1/24.
 */
module.exports = function() {
    return {
        typeGenerateRules : 'RadioGroup',

        propertyGenerateRules: {
            default: 'android:{{key}}="{{value}}"',

            replace: {
                id: 'android:{{key}}="@+id/{{value}}"',
                layout_above: 'android:{{key}}="@+id/{{value}}"'
            }
        }
    }
}