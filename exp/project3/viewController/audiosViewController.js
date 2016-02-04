/**
 * Created by danney on 16/2/2.
 */
module.exports = {
    name: 'AudiosViewController',

    type: 'ListViewController',

    viewModel: {
        name: 'audiosVM',
        type: 'AudiosViewModel'
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
                listData: '@{audiosVM.audios}'
            }
        }]
    }
}