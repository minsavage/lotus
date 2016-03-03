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
                loadingVM.loadStatus = 2;
            }
            else {
                showPage('MainPage');
                closePage();
            }
        },

        //'loadingVM.queryOnlineFinished': function() {
        //    showPage('MainPage');
        //    closePage();
        //},

        'loadingVM.loadStatus': function() {
            if(loadingVM.loadStatus == 0) {
                showPage('MainPage');
                closePage();
            }
            else if(loadingVM.loadStatus == 1) {
                rlLoadFailure.visibility = native('View.VISIBLE');
                tvLoading.visibility = native('View.GONE');
            }
            else if(loadingVM.loadStatus == 2) {
                tvLoading.visibility = native('View.VISIBLE');
                rlLoadFailure.visibility = native('View.GONE');
                loadingVM.queryAudios();
            }
        }
    },

    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'TextView',
            id: 'tvLoading',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '这是一个LoadingPage',
            event: {}
        }, {
            type: 'RelativeLayout',
            id: 'rlLoadFailure',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            units: [{
                type: 'TextView',
                id: 'tvLoadFailure',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_centerInParent: true,
                text: '加载失败，轻触屏幕重新加载'
            }],
            event: {
                onClick: function() {
                    loadingVM.loadStatus = 2;
                    loadingVM.loadStatus = native('sssdfdssssssssssss');
                    close();
                }
            }
        }]
    },

    native: function(){

        sss
        native('')
        function close() {

        }
    }
}