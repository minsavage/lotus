/**
 * Created by danney on 16/4/1.
 */
module.exports = {
    name: 'RevealSquareItemViewController',
    import:['$.model.Forum'],
    config: {
        layoutOnly: true
    },
    viewModels: {
        master: {
            type: 'Forum',
            name: 'forum'
        }
    },
    content: {
        type: 'RelativeLayout',
        id: 'relativeLayout',
        layout_width: 'match_parent',
        layout_height: '100dp',
        units: [
        //    {
        //    type: 'ImageView',
        //    id: 'ivForumPic',
        //    layout_width: '50dp',
        //    layout_height: '50dp',
        //    uri: '@{forum.forum_pic}'
        //},
            {
            type: 'TextView',
            id: 'textViewName',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{forum.title}'
        },{
            type: 'TextView',
            id: 'textViewContent',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{forum.detail}'
        }],
        event: {
            onClick: function() {
                showPage('PostsPage');
            }
        }
    }
}