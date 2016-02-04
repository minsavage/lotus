/**
 * Created by danney on 16/1/19.
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


module.exports = {
    name: 'MainViewController',
    viewModel: {
        type: 'MainViewModel',
        name: 'mainVM'
    },

    bind: {
        'mainVM.audio': {

        }
    },

    'event': {

    },

    'content': {
        'type': 'RelativeLayout',
        'id': 'rootLayout',
        'layout_width': 'match_parent',
        'layout_height': 'match_parent',
        'units': [{
            type: 'SimpleDraweeView',
            id: 'dvAudioBkg',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            uri: '@{mainVM.picAudioBkg}',
            actualImageScaleType: 'centerCrop'
        }, {
            'type': 'FrameLayout',
            'id': 'frameLayout_backgroundMask',
            'layout_width': 'match_parent',
            'layout_height': 'match_parent'
        }, {
            type: 'RelativeLayout',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            units: [{
                type: 'ViewController',
                id: 'contentViewController',
                name: 'LoadingViewController',
                layout_width: 'match_parent',
                layout_height: 'match_parent',
                layout_marginTop: "80dp",
                layout_marginBottom: "80dp"
            }, {
                type: 'TextView',
                id: 'textView_time',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_marginTop: '20dp',
                text: '12:00',
                textColor: '#000000',
                textSize: '20dp'
            }, {
                type: 'ImageView',
                id: 'ivMixerButton',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_alignParentBottom: 'true',
                layout_centerHorizontal: 'true',
                layout_marginBottom: '15dp',
                //src: '....', // todo: 配置一个xml的selector， 怎么兼容ios ？
                visibility: 'gone',
                event: {
                    onClick: {
                        'playerViewController.visible': 'gone',
                        'modelDialog.show': {
                            'config': {
                                'viewController': 'mixerViewController',
                                'layout': {
                                    layout_width: 'wrap_content',
                                    heigth: 'wrap_content',
                                    above: 'mainViewController.ivMixerButton'
                                }
                            }
                        }
                    }
                }
            }, {
                type: 'RelativeLayout',
                id: 'bottomBar',
                layout_width: 'match_parent',
                layout_height: '50dp',
                layout_alignParentBottom: true,
                background: '#FFFFFFFF',
                units:[{
                    type: 'ImageView',
                    id: 'settingBtn',
                    layout_width: '50dp',
                    layout_height: '50dp',
                    layout_alignParentLeft:true,
                    background: '#123456',
                    event: {
                        'onClick': function(){
                            settingPage.show();
                        }
                    }
                }, {
                    type: 'ImageView',
                    id: 'shopBtn',
                    layout_width: '50dp',
                    layout_height: '50dp',
                    layout_alignParentRight:true,
                    background: '#123456',
                    event: {
                        onClick: function() {

                        }
                    }
                }, {
                    type: 'TextView',
                    id: 'tvCurrentAudioName',
                    layout_width: 'wrap_content',
                    layout_height: 'wrap_content',
                    text: '@{mainVM.audio.name}'
                }]
            }]
        }]
    }
}