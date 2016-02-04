/**
 * Created by danney on 15/11/25.
 */
var tpl = require('../builder/template');
var extend = require('util')._extend;

var view = {
    property: {},

    event: {
        'View.OnClickListener': {
            shortName: 'OnClickListener',
            methods: ['onClick', 'onLongClick'],
            setterTemplate: '{{object}}.setOnClickListener({{listenerName}})',
            ImplTemplate: tpl.listener.onClickListener
        }
    }
}

var slideSwitch = {
    property: {
        'enable': {
            type: 'bool',
            setter: 'setState',
            getter: 'isOpen'
        },

        'time': {
            type: 'string',
            setter: 'setTimerClock'
        }
    },

    event: {
        'SlideSwitch.SlideListener': {
            shortName: 'SlideListener',
            methods: [
                'onOpen',
                'onClose',
                'onClick',
                'onProgress'
            ],
            setterTemplate: '{{object}}.setOnClickListener({{listenerName}})',
            ImplTemplate: tpl.listener.slideListener
        }
    }
}

var imageView = extend({}, view);

var uiControlMetadata = {
    'View': view,
    'ImageView': imageView,
    'SlideSwitch': slideSwitch
}

module.exports = uiControlMetadata;