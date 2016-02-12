/**
 * Created by danney on 16/1/19.
 */
var view = require('../view/codeBuildConfig');
var extend = require('util')._extend;

module.exports = {
    name: 'TextView',

    import: [
        'android.widget.TextView'
    ],

    event: extend({
        onEditorAction: {
            init: 'ffff',
            impl: 'ggg'
        }

    }, view.event)
}