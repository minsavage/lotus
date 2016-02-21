/**
 * Created by danney on 16/2/18.
 */
module.exports = {
    name: 'MainViewController',
    viewModels: {
        master: {
            type: 'MainViewModel',
            name: 'mainVM'
        }
    },
    event: {
        onCreateView: function() {
            mainVM.queryCurrentAudio();
        }
    },

    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'XImageView',
            id: 'ivBkg',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            uri: '@{mainVM.audio.picBkgUrl}'
        }, {
            type: 'RelativeLayout',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            layout_above: 'bottom',
            units: [{
                type: 'TextView',
                id: 'tvCurrentTime',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                text: '12:00',
                textSize: '24dp'
            }]
        }, {
            type: 'RelativeLayout',
            id: 'bottom',
            layout_width: 'match_parent',
            layout_height: '50dp',
            layout_alignParentBottom: true,
            background: '#333333',
            units:[{
                type: 'TextView',
                id: 'tvAudioName',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                text: '@{mainVM.audio.name}',
                event: {
                    onClick: function() {
                        showPage('AudioListPage');
                    }
                }
            }]
        }]
    }
}