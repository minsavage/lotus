/**
 * Created by danney on 16/4/8.
 */
module.exports = {
    name: 'PostsViewController',
    import:['$.viewModel.PostsViewModel'],
    viewModels: [{
        type: 'PostsViewModel',
        name: 'postsVM',
        init: {
            forumId: '@{props.forumId}'
        }
    }],
    bind: {
        'postsVM.posts': function() {
            recyclerViewAdapter.notifyDataSetChanged();
        }
    },
    event: {
        onStart: function() {
            postsVM.queryPosts();
        }
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'RelativeLayout',
            id: 'top',
            layout_width: 'match_parent',
            layout_height: '50dp',
            background: '#999999',
            units: [{
                type: 'ImageView',
                id: 'ivBack',
                layout_width: '30dp',
                layout_height: '30dp',
                layout_alignParentLeft: true,
                background: '#000000',
                event: {
                    onClick: function() {
                        closePage();
                    }
                }
            }, {
                type: 'ImageView',
                id: 'ivNewPost',
                layout_width: '30dp',
                layout_height: '30dp',
                layout_alignParentRight: true,
                background: '#000000',
                event: {
                    onClick: function() {
                    }
                }
            }]
        },{
            type: 'RecyclerView',
            id: 'myRecyclerView',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            layout_below: 'top',
            adapter: {
                item: 'PostItemViewController',
                dataSource: '@{postsVM.posts}'
            }
        }]
    }
}