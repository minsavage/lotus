/**
 * Created by danney on 15/11/30.
 */

var mainViewModel = {
    fields: [
        {name: 'audio', type: 'Audio'},
        {name: 'currentTime', type: 'string'},
        {name: 'alarmEnabled', type: 'bool'},
        {name: 'alarmHour', type: 'int'},
        {name: 'alarmMinute', type: 'int'},
        {name: 'lastAlarmTimeExist', type: 'bool'}
    ]
};

var mainViewController = {
    viewModel: 'MainViewModel',
    content: {
        type: 'RelativeLayout',
        id: 'root',
        layout: {

        },
        units: [
            {
                type: 'com.facebook.drawee.view.SimpleDraweeView',
                id: 'ivAudioBackground'
            },

            {
                type: 'RelativeLayout',
                layout: {

                },
                units: [
                    {
                        type: 'TextView',
                        id: 'currentTime',
                        layout: {
                            width: "match_parent",
                            height: "wrap_content",
                            marginTop: "@dimen/main_time_text_top"
                        },
                        gravity: "center",
                        textColor: "@color/white_67",
                        textSize: "@dimen/main_time_text_size",
                        text: "@{MainViewModel.currentTime}",
                        alpha: "@{MainViewModel.playerStatus == 0 ? 1 : 0 }",

                    },

                    {
                        type: 'com.soundario.dreamcloud.widget.SlideSwitch',
                        id: 'slideSwitch',
                        'switch:isOpen': '@{MainViewModel.isAlarmEnabled}',
                        'switch:text': '@{MainViewModel.alarmHour == -1 ? "" : String.format("%02d:%02d", MainViewModel.alarmHour, MainViewModel.alarmMinute)}',
                        event: {
                            'setSlideListener': {
                                'onOpen': function() {
                                    if(!MainViewModel.lastAlarmTimeExist) {
                                        MainViewModel.setAlarmTimeByCurrentTime();
                                        showTimePicker();
                                    }
                                },

                                'onClose': '',

                                'onClick': function() {
                                    showTimePicker();
                                },

                                'onProgress': ''
                            }
                        }
                    }
                ]
            }
        ]
    },

    method: {
        'showTimePicker': function() {
            PopupWindow.show({
                viewController: 'TimePickerViewController'
            });
        }
    }
}

console.log(mainViewController.method['showTimePicker'].toString());