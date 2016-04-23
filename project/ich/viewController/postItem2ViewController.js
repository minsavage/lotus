/**
 * Created by danney on 16/4/1.
 */
module.exports = {
    name: 'PostItem2ViewController',
    viewModels: {
        master: {
            type: 'PostItemViewModel',
            name: 'postItemVM'
        }
    },

    content: {
        type: 'LinearLayout',
        layout_width: 'match_parent',
        layout_height: 'wrap_content',
        orientation: 'vertical',
        background: '#999999',
        units: [{
            type: 'TextView',
            id: 'textView',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{postItemVM.post.title}'
        },{
            type: 'TextView',
            id: 'textViewName',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{postItemVM.post.author}'
        },{
            type: 'TextView',
            id: 'textViewContent',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{postItemVM.post.text}',
            event:{
                onClick: function(){
                    showPage('PostDetailPage');
                }
            }
        }]
    }
}