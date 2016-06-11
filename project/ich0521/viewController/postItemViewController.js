/**
 * Created by danney on 16/4/1.
 */
module.exports = {
    name: 'PostItemViewController',
    import:['$.model.Post'],
    config: {
        layoutOnly: true
    },
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
        background: '#999999',
        units: [{
            type: 'TextView',
            id: 'textView',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{post.title}'
        },{
            type: 'TextView',
            id: 'textViewName',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{post.author}'
        },{
            type: 'TextView',
            id: 'textViewContent',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{post.text}',
            event:{
                onClick: function(){
                    //showPage('PostDetailPage');
                }
            }
        }]
    }
}