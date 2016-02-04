/**
 * Created by danney on 16/1/18.
 */
module.exports = {
    name: 'Tab2ViewController',
    viewModel: {
        type: 'LoadingViewModel',
        name: 'loadingVM'
    },
    event: {

    },

    bind: {
        'loadingVM.isQueryCurrentAudioFinished': function() {
            //跳转去主页面
        }
    },

    content: {
        type: 'RelativeLayout',
        id: 'relativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [
            {
                id: 'textView',
                type: 'TextView',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                text: 'hello tab2'
            }
        ]
    }
}