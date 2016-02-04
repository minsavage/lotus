/**
 * Created by danney on 16/1/19.
 */
var view = require('../view/codeBuildConfig');
var extend = require('util')._extend;

module.exports = {
    name: 'ImageView',

    import: [
        'android.widget.ImageView'
    ],

    event: extend({}, view.event)
}