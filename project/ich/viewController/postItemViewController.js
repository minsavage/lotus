/**
 * Created by danney on 16/4/1.
 */
module.exports = {
    config: {
        layoutOnly: true,
        layoutDataBinding: false
    },
    name: 'PostItemViewController',
    viewModels: {
        master: {
            type: 'Post',
            name: 'post'
        }
    },

    content: {
        type: 'LinearLayout',
        layout_width: 'match_parent',
        layout_height: 'wrap_content',
        orientation: 'vertical',
        units: []
    }
}