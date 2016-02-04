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
    'name': 'MainViewController2',
    'viewModel': {
        type: 'MainViewModel',
        id: 'mainVM'
    },
    'event': {
        'onStart': function(){
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
            uri: '@{mainViewModel.picAudioBkg}'
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
                text: '12:00',
                textColor: '#000000',
                textSize: '20dp'
            }, {
                type: 'ViewController',
                id: 'playerViewController',
                name: 'PlayerViewController',
                layout: {
                    width: '151dp',
                    height: '151dp',
                    below: 'textView_time',
                    centerHorizontal: true
                }
            }, {
                type: 'com.soundario.dreamcloud.widget.SlideSwitch',
                id: 'slideSwitch',
                layout: {
                    width: '150dp',
                    height: '150dp',
                    below: 'playerViewController',
                    centerHorizontal: true,
                    marginTop: '71dp'
                },
                'switch:isOpen': '@{mainViewModel.alarmActive}',
                'switch:time': '@{stringFomart("HH:MM", mainViewModel.alarmHour, mainViewModel.alarmMinute)}',
                event: {
                    //onSwitchChange: function(enable) {
                    //    mainViewModel.alarmActive = enable;
                    //},
                    //
                    //onSwitchClick: function() {
                    //    modelDialog.show({
                    //        'viewController': 'alarmSettingViewController',
                    //        'layout': {
                    //            width: 'wrap_content',
                    //            heigth: 'wrap_content',
                    //            above: 'mainViewController.slideSwitch'
                    //        }
                    //    });
                    //
                    //    playerViewController.visible = 'hide';
                    //},

                    onSwitchChange: {
                        argument: [{
                            type: 'bool',
                            name: 'enable'
                        }],
                        action: {
                            'mainViewModel.alarmActive': 'enable'
                        }
                    },

                    onSwitchClick: {
                        action: {
                            'playerViewController.visible': 'gone',
                            'modelDialog.show': {
                                'config': {
                                    'viewController': 'alarmSettingViewController',
                                    'layout': {
                                        width: 'wrap_content',
                                        heigth: 'wrap_content',
                                        above: 'mainViewController.slideSwitch'
                                    }
                                }
                            }
                        }
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
                visibility: 'gone',
                event: {
                    'onClick': {
                        'playerViewController.visible': 'gone',
                        'modelDialog.show': {
                            'config': {
                                'viewController': 'mixerViewController',
                                'layout': {
                                    width: 'wrap_content',
                                    heigth: 'wrap_content',
                                    above: 'mainViewController.imageView_MixerButton'
                                }
                            }
                        }
                    }

                    //'onClick': function(){
                    //    playerViewController.visible = 'gone';
                    //    if(existLocalMusic(mainViewModel.audio)) {
                    //        modelDialog.show({
                    //            'config': {
                    //                'viewController': 'mixerViewController',
                    //                'layout': {
                    //                    width: 'wrap_content',
                    //                    heigth: 'wrap_content',
                    //                    above: 'mainViewController.imageView_MixerButton'
                    //                }
                    //            }
                    //        })
                    //    }
                    //    else {
                    //        modelDialog.show({
                    //            'config': {
                    //                'viewController': 'downloadViewController',
                    //                'layout': {
                    //                    width: 'wrap_content',
                    //                    heigth: 'wrap_content',
                    //                    above: 'mainViewController.imageView_MixerButton'
                    //                }
                    //            }
                    //        })
                    //    }
                    //}
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
                    id: 'textView_currentAudioName',
                    layout: {
                        width: 'wrap_content',
                        height: 'wrap_content'
                    },
                    bind: {
                        text: 'mainViewModel.audioName'
                    }
                }]
            }]
        }]
    }
}



module.exports = mainViewController;


//1var layout = {
//    2    id: 'layout001',
//    3    componentType: 'layout',
//    4    componentConfig: {
//    5        minWidth: 1000,
//        6        units:[{
//        7            position: 'top',
//        8            height: 20,
//        9            id: 'menu001',
//        10            componentType: 'menu',
//        11            componentConfig:{
//        12                itemdata: [{
//            13                    text: "首页",
//            14                    url: 'index.html',
//            15                }, {
//        16                    text: '员工管理',
//            17                    submenu:{
//            18                        id: 'employee',
//                19                        itemdata:[{
//                20                            text: '基本信息',
//                21                            helptext: 'Ctrl + G',
//                22                            url: 'testpage/EmployeeInfo.html'}
//        23                        }]
//    24                    }
//25                }]
//26            }
//27        }, {
//    28            position: 'center',
//        29            id: 'table001',
//        30            componentType: 'table',
//        31            componentConfig:{
//        32                column: [
//            33                    {key:"Id", label: '编号'},
//            34                    {key:"Name", label: '姓名'},
//            35                    {key: "Gender", label: '性别'},
//            36                    {key:"Age", label: '年龄'},
//            37                    {key:"Address", label: '家庭住址'}
//            38                ],
//            39                dataSource: {
//            40                    type: 'remote',
//                41                    url: '/dbaction'
//            42                    sqlNumber: '002'
//            43                },
//        44                schema: {
//            45                   fields: ["Id","Name","Gender","Age","Address"]
//            46                },
//        47            }
//    48        }, {
//    49            position: 'bottom',
//        50            height: 32,
//        51            id: 'button001',
//        52            componentType: 'button',
//        53            componentConfig:{
//        54                label: '查看',
//            55                msg: [{
//            56                    type: 'P2P',
//            57                    msgId: 'OPEN',
//            58                    srcId: 'button001',
//            59                    destId: 'dialog001'
//        60                }]
//    61                map: 'tableViewerDispalyConfig'
//    62            }
//63        }]
//64    }
//65};