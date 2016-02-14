/**
 * Created by danney on 16/2/2.
 */
module.exports = {
    name: 'AudioItemViewController',

    config: {
        layoutOnly: true,
        layoutDataBinding: false
    },

    viewModel: {
        name: 'audio',
        type: 'Audio'
    },

    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'TextView',
            id: 'textView',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{audio.name}'
        }]
    }
}