/**
 * Created by danney on 16/2/1.
 */
module.exports = {
    name: 'AudiosViewController',

    type: 'ListViewController',

    viewModel: {
        name: 'usersVM',
        type: 'UserListViewModel'
    },


    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'XListView',
            id: 'listView',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            ptrMode: 'both',

            adapter: {
                type: 'default',
                listItem: 'AudioItemViewController',
                listData: '@{usersVM.users}'
            }
        }]
    }
}