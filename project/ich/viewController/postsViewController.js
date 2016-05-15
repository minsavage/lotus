/**
 * Created by danney on 16/4/8.
 */
module.exports = {
    // import: [
    //     '$.viewController.PostItem2ViewController'
    // ],
    name: 'PostsViewController',
    viewModels: {
        master: {
            type: 'PostsViewModel',
            name: 'postsVM'
        }
    },
    content: {
        type: 'LinearLayout',
        layout_width: 'match_parent',
        layout_height: 'wrap_content',
        orientation: 'vertical',
        units: [{
            type: 'RecyclerView',
            id: 'myRecyclerView',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            adapter: {
                item: 'PostItem2ViewController',
                dataSource: '@{postsVM.postList}'
            }
        }]
    }
}