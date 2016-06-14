/**
 * Created by danney on 16/6/11.
 */
module.exports = {
    name: 'PostDetailViewController',
    import:['$.viewModel.PostDetailViewModel'],
    viewModels: [{
        type: 'PostDetailViewModel',
        name: 'pdVM',
        init: {
            pid: '@{props.pid}'
        }
    }],
    bind: {
        'pdVM.comments': function() {
            recyclerViewAdapter.notifyDataSetChanged();
        }
    },
    event: {
        onStart: function() {
            pdVM.queryComments();
        }
    },
    content:{
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
                type: 'staticFirstItem',
                staticFirstItem: 'PostDetailTopViewController',
                item: 'CommentItemViewController',
                dataSource: '@{pdVM.comments}'
            }
        }]
    }
}