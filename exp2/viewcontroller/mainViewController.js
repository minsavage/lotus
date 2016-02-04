/**
 * Created by danney on 15/11/22.
 */

/**
 * 1、生成xml
 * 2、生成成员变量
 * 3、生成代码中xml的加载片段
 * 4、生成成员变量初始化（UI控件，VC，VM）
 * 5、生成子viewController的加载
 * 6、生成事件绑定
 * 7、生成ViewController 主框架
 * 8、递归生成sub vc
 * 9、生成page
 * 10、 生成application
 * */


var mainViewController = {
    'name': 'MainViewController',
    'viewModel': {
        type: 'MainViewModel',
        name: 'mainVM',
        bind: {
            'mainVM.playerStatus': function() {
                if(mainVM.playerStatus == PlayerStatus.PlayerStatusStopped) {
                    bottomBar.visibility = 'visible';
                    slideSwitch.visibility = 'visible';
                    ivMixerBtn.visibility = 'gone';
                }
                else {
                    bottomBar.visibility = 'gone';
                    slideSwitch.visibility = 'gone';
                    ivMixerBtn.visibility = 'visible';
                }
            }
        }
    },

    'content': {
        'type': 'RelativeLayout',
        'id': 'rootLayout',
        'layout': {
            'width': 'match_parent',
            'height': 'match_parent'
        },
        'units': [{
            'id': 'xxxx',
            'type': 'com.facebook.drawee.view.SimpleDraweeView',
            layout: {
                'width': 'match_parent',
                'height': 'match_parent'
            },
            'fresco:actualImageScaleType': 'fixXY',
            'lotus:uri': '@{mainVM.audio.picAudioBkg}'
        }, {
            'type': 'FrameLayout',
            'id': 'frameLayout_backgroundMask',
            'layout': {
                'width': 'match_parent',
                'height': 'match_parent'
            },
            'background': '#000000'
        }, {
            type: 'RelativeLayout',
            layout: {
                width: 'match_parent',
                height: 'match_parent'
            },
            units: [{
                type: 'TextView',
                id: 'textView_time',
                layout: {
                    width: 'wrap_content',
                    height: 'wrap_content',
                    marginTop: '20dp'
                },
                textColor: '#000000',
                textSize: '20dp',
                text: '@{mainVM.currentTime}'
            }, {
                type: 'ViewController',
                id: 'playerViewController',
                layout: {
                    width: '151dp',
                    height: '151dp',
                    below: 'textView_time',
                    centerHorizontal: true
                },
                name: 'PlayerViewController'
            }, {
                type: 'SlideSwitch',
                id: 'slideSwitch',
                layout: {
                    width: '150dp',
                    height: '150dp',
                    below: 'playerViewController',
                    centerHorizontal: true,
                    marginTop: '71dp'
                },
                'switch:isOpen': '@{mainViewModel.alarmEnabled}',
                'switch:text': '@{mainVM.alarmHour == -1 ? "" : String.format("%02d:%02d", mainVM.alarmHour, mainVM.alarmMinute)}',
                event: {
                    onOpen: function() {
                        if(!mainVM.alarmSettingExist) {
                            mainVM.setAlarmTimeByCurrentTime();
                            showTimePicker();
                        }
                        else {
                            mainVM.alarmEnabled = true;
                        }
                    },

                    onClose: function() {
                        mainVM.alarmEnabled = false;
                    },

                    onClick: function() {
                        showTimePicker();
                    }
                }
            }, {
                type: 'ImageView',
                id: 'imageView_MixerButton',
                layout: {
                    width: 'wrap_content',
                    height: 'wrap_content',
                    alignParentBottom: 'true',
                    centerHorizontal: 'true',
                    marginBottom: '15dp'
                },
                src: '....', // todo: 配置一个xml的selector， 怎么兼容ios ？
                visibility: '@{mainVM.playerStatus == PlayerStatusPlaying ? View.VISIBLE : View.GONE}',
                event: {
                    'onClick': function() {
                        if(mainVM.localAudioFileExist) {
                            showVolumePanel();
                        }
                        else {
                            showDownloadPanel();
                        }
                    }
                }
            }, {
                type: 'RelativeLayout',
                id: 'bottomBar',
                layout: {
                    width: 'match_parent',
                    height: '20dp',
                    alignParentBottom: true
                },
                background: '#80FFFFFF',
                visibility: '@{mainVM.playerStatus == PlayerStatusPlaying ? View.VISIBLE : View.GONE}',
                units:[{
                    type: 'ImageView',
                    id: 'settingBtn',
                    layout: {
                        width: 'wrap_content',
                        height: 'wrap_content'
                    },
                    event: {
                        'onClick': function(){
                            settingPage.show();
                        }
                    }
                }, {
                    type: 'ImageView',
                    id: 'shopBtn',
                    layout: {
                        width: 'wrap_content',
                        height: 'wrap_content'
                    },
                    event: {

                    }
                }, {
                    type: 'TextView',
                    id: 'tvCurrentAudioName',
                    layout: {
                        width: 'wrap_content',
                        height: 'wrap_content'
                    },
                    text: '@{mainVM.audio.name}'
                }]
            }]
        }]
    }
}


module.exports = mainViewController;