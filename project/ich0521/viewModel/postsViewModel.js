/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'PostsViewModel',
    import: [
        '$.viewModel.PostItemViewModel',
        '$.model.QueryPosts',
        'java.util.ArrayList'
    ],
    properties: [
        {name: 'posts', type: 'ArrayList<PostItemViewModel>'},
        {name: 'page', type: 'int'},
        {name: 'count', type: 'int'},
        {name: 'forumId', type: 'int'}
    ],
    methods: {
        queryPosts: {
            action: 'PostsOperator.query',
            parameters: {
                page: '@{page}',
                count: '@{count}',
                forum_id: '@{forumId}'
            },
            response: {
                onSuccess: function(ret) {
                },

                onFailure: function(err) {
                }
            }
        }
    }
}