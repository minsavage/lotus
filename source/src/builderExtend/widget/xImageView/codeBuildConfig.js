/**
 * Created by danney on 16/1/19.
 */
var view = require('../android/view/codeBuildConfig');
var extend = require('util')._extend;

module.exports = {
    name: 'SimpleDraweeView',

    import: [
        'com.facebook.drawee.backends.pipeline.Fresco',
        'com.facebook.drawee.view.SimpleDraweeView',
        'android.net.Uri'
    ],

    event: extend({}, view.event)
}