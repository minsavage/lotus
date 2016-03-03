/**
 * Created by danney on 16/2/17.
 */
module.exports = {
    name: 'AudioListViewController',
    type: 'ListViewController',
    viewModels: {
        master: {
            type: 'AudioListViewModel',
            name: 'audiosVM'
        },
        slave: [{
            type: 'MainViewModel',
            name: 'mainVM'
        }],
        init: function() {
            audiosVM.currentAudioName = mainVM.audio.name;
        }
    },
    event: {
        onCreateView: function() {
            prepareData();
        }
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'RelativeLayout',
            id: 'top',
            layout_width: 'match_parent',
            layout_height: '50dp',
            background: '#ff002f6c',
            units:[{
                type: 'TextView',
                id: 'tvCurrentAudioName',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_centerInParent: true,
                text: '@{audiosVM.currentAudioName}'
            }, {
                type: 'ImageView',
                id: 'ivBackBtn',
                layout_width: '20dp',
                layout_height: '20dp',
                layout_marginLeft: '10dp',
                layout_marginTop: '10dp',
                background: '#333333',
                event: {
                    onClick: function() {
                        closePage();
                    }
                }
            }]
        }, {
            type: 'XListView',
            id: 'listView',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            layout_below: 'top',
            ptrMode: 'both',
            adapter: {
                listItem: 'AudioListItemViewController',
                listData: '@{audiosVM.audioList}'
            },
            event: {
                onItemClick: function () {
                    audiosVM.selectedAudio = audiosVM.audioList.get(position);
                    audiosVM.saveCurrentAudio();
                    mainVM.audio = audiosVM.selectedAudio;
                    closePage();
                }
            }
        }, {
            type: 'RelativeLayout',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            id: 'rlLoading',
            visibility: 'gone',
            units: [{
                type: 'TextView',
                id: 'tvLoading',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_centerInParent: true,
                text: '正在努力加载...',
                textColor: '#FFFFFF'
            }],
            event: {}
        }, {
            type: 'RelativeLayout',
            id: 'rlLoadFailure',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            visibility: 'gone',
            units: [{
                type: 'TextView',
                id: 'tvLoadFailure',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_centerInParent: true,
                text: '加载失败，轻触屏幕重新加载',
                textColor: '#FFFFFF'
            }],
            event: {
                onClick: function() {

                }
            }
        }]
    }
}