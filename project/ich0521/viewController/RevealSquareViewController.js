/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'RevealSquareViewController',
    import:['$.viewModel.RevealSquareViewModel'],
    viewModels: [{
        type: 'RevealSquareViewModel',
        name: 'rsVM'
    }],
    bind: {
        'rsVM.forums': function() {
            recyclerViewAdapter.notifyDataSetChanged();
        }
    },
    event: {
        onStart: function() {
            rsVM.queryForums();
        }
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'RecyclerView',
            id: 'myRecyclerView',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            adapter: {
                item: 'RevealSquareItemViewController',
                dataSource: '@{rsVM.forums}'
            }
        }]
    }
}