/**
 * Created by danney on 16/4/1.
 */
module.exports = {
    name: 'CommentItemViewController',
    import:['$.model.Comment'],
    config: {
        layoutOnly: true
    },
    viewModels: [{
        type: 'Comment',
        name: 'comment'
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
            id: 'tvAuthor',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{comment.r_uname}',
            textColor: '#3C19BE'
        },{
            type: 'TextView',
            id: 'tvContent',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            layout_below: 'tvAuthor',
            text: '@{comment.r_text}',
            textColor: '#008000'
        },{
            type: 'TextView',
            id: 'tvTime',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            layout_below: 'tvContent',
            //lines: "3",
            //ellipsize: "end",
            //text: '@{post.text}'
        }],
        event:{
            onClick: function(){
                //showPage('PostDetailPage', {pid: post.pid});
            }
        }
    }
}