/**
 * Created by danney on 15/11/25.
 */
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
    }
    //
    //'package': 'com.soundario.dreamcloud.widget'
}



var thirdpartyWidgetMetadata = {
    'com.soundario.dreamcloud.widget.SlideSwitch': slideSwitch
}

module.exports = uiControlMetadata;