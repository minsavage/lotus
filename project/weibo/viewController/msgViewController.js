/**
 * Created by danney on 16/2/26.
 */
module.exports = {
    name: 'MsgViewController',
    viewModels: {
        master: {
            type: 'MsgViewModel',
            name: 'msgVM'
        }
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units:[{
            type: 'TextView',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: 'MsgViewController'
        }]
    }
}