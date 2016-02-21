/**
 * Created by danney on 16/2/19.
 */
module.exports = {
    name: 'LoadingViewController',
    viewModels: {
        master: {
            type: 'LoadingViewModel',
            name: 'loadingVM'
        }
    },

    event: {
        onCreateView: function() {
            loadingVM.queryCurrentAudio();
        }
    },

    bind: {
        'loadingVM.queryFinished': function() {
            if(loadingVM.currentAudio == null) {
                loadingVM.queryAudios();
            }
            else {
                showPage('MainPage');
                closePage();
            }
        },

        'loadingVM.queryOnlineFinished': function() {
            showPage('MainPage');
            closePage();
        }
    },

    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'TextView',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '这是一个LoadingPage'
        }]
    }
}