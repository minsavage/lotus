/**
 * Created by danney on 16/4/9.
 */
module.exports = {
    name: 'PostDetailViewController',
    viewModels: {
        master: {
            type: 'PostDetailViewModel',
            name: 'postDetailVM'
        }
    },
    content: {
        type: 'LinearLayout',
        layout_width: 'match_parent',
        layout_height: 'wrap_content',
        orientation: 'vertical',
        units: [{
            type:'TextView',
            id:'textView',
            text: 'Post Detail Page'
        }]
    }
}