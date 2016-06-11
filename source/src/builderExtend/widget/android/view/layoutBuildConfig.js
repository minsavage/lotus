/**
 * Created by danney on 16/1/24.
 */
module.exports = function() {
    return {
        typeGenerateRules : '{{value}}',

        propertyGenerateRules: {
            default: 'android:{{key}}="{{value}}"',

            replace: {
                id: 'android:{{key}}="@+id/{{value}}"',
                layout_below: 'android:{{key}}="@+id/{{value}}"',
                layout_above: 'android:{{key}}="@+id/{{value}}"',
                layout_toRightOf: 'android:{{key}}="@+id/{{value}}"'
            },

            ignore: {
                type: true,
                event: true,
                codeTranslatorEnv: true
            }
        }
    }
}