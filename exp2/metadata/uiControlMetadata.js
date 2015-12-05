/**
 * Created by danney on 15/11/25.
 */
var tpl = require('../builder/template');
var extend = require('util')._extend;

var view = {
    property: {

    },

    event: {
        'onClick': {
            'listenerName': 'OnClickListener',
            'setListenerMethodName' : 'setOnClickListener',
            'listenerImpl': tpl.listener.onClickListener
        }
    }
}

var imageView = extend({}, view);

var uiControlMetadata = {
    'View': view,
    'ImageView': imageView
}

module.exports = uiControlMetadata;