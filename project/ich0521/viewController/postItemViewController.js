/**
 * Created by danney on 16/4/1.
 */
module.exports = {
    name: 'PostItemViewController',
    import:['$.model.Post'],
    config: {
        layoutOnly: true
    },
    viewModels: [{
        type: 'Post',
        name: 'post'
    }],
    content: {
        type: 'RelativeLayout',
        id: 'root',
        layout_width: 'match_parent',
        layout_height: 'wrap_content',
        paddingLeft: "10dp",
        paddingTop: "10dp",
        units: [{
            type: 'TextView',
            id: 'tvTitle',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{post.title}',
            textColor: '#3C19BE'
        },{
            type: 'TextView',
            id: 'tvName',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            layout_below: 'tvTitle',
            text: '@{post.author}',
            textColor: '#008000'
        },{
            type: 'TextView',
            id: 'textViewContent',
            layout_width: 'wrap_content',
            layout_height: '60dp',
            layout_below: 'tvName',
            lines: "3",
            ellipsize: "end",
            text: '@{post.text}'
        }],
        event:{
            onClick: function(){
                showPage('PostDetailPage', {pid: post.pid});
            }
        }
    }
}