/**
 * Created by danney on 16/4/8.
 */
module.exports = {
    name: 'PostsViewController',
    viewModels: {
        master: {
            type: 'PostsViewModel',
            name: 'postsVM'
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