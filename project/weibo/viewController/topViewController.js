/**
 * Created by danney on 16/2/27.
 */
module.exports = {
    name: 'TopViewController',
    viewModels: {
        master: {
            type: 'TopViewModel',
            name: 'topVM'
        }
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: '100dp',
        background: '#333333',
        units:[{
            type: 'TextView',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: 'TopViewController'
        }]
    }
}