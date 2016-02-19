/**
 * Created by danney on 16/2/17.
 */
module.exports = {
    config: {
        layoutOnly: true,
        layoutDataBinding: false
    },
    name: 'AudioListItemViewController',
    viewModels: {
        master: {
            type: 'Audio',
            name: 'audio'
        }
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: '50dp',
        background: '#666666',
        units:[{
            type: 'XImageView',
            id: 'ivAudioCover',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            uri: '@{audio.picCoverUrl}'
        }, {
            type: 'TextView',
            id: 'tvName',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            layout_marginLeft: '10dp',
            layout_marginTop: '10dp',
            background: '#333333',
            text: '@{audio.name}'
        }]
    }
}