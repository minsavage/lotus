/**
 * Created by danney on 16/2/2.
 */
module.exports = {
    name: 'MainViewController',

    viewModel: {
        name: 'mainVM',
        type: 'MainViewModel'
    },

    bind: {
    },



    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units:[{
            type: 'ViewController',
            id: 'audiosViewController',
            name: 'AudiosViewController',
            layout_width: 'match_parent',
            layout_height: '300dp',
            layout_alignParentBottom: true,
            background: '#999999'
        }]
    }
}