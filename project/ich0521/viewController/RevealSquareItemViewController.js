/**
 * Created by danney on 16/4/1.
 */
module.exports = {
    name: 'RevealSquareItemViewController',
    import:['$.model.Forum'],
    config: {
        layoutOnly: true
    },
    viewModels: [{
        type: 'Forum',
        name: 'forum'
    }],
    content: {
        type: 'RelativeLayout',
        id: 'relativeLayout',
        layout_width: 'match_parent',
        layout_height: '60dp',
        units: [
        //    {
        //    type: 'XImageView',
        //    id: 'ivForumPic',
        //    layout_width: '50dp',
        //    layout_height: '50dp',
        //    uri: '@{forum.forum_pic}'
        //},
            {
            type: 'TextView',
            id: 'tvForumName',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            layout_marginLeft:"60dp",
            text: '@{forum.title}'
        },{
            type: 'TextView',
            id: 'tvDescription',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            layout_below:"tvForumName",
            layout_marginLeft:"60dp",
            text: '@{forum.detail}'
        }],
        event: {
            onClick: function() {
                showPage('PostsPage', {
                    forumId: forum.id
                });
            }
        }
    }
}