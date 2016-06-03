/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'PostsViewModel',
    import: [
        '$.viewModel.PostItemViewModel',
        '$.model.QueryPosts',
        '$.model.Post',
        'java.util.List',
        'java.util.ArrayList'
    ],
    properties: [
        {name: 'posts', type: 'List<PostItemViewModel>'},
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
                    //posts = ret.content.posts;
                },

                onFailure: function(err) {
                }
            }
        }
    }
}