/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'PostsViewModel',
    import: [
        '$.viewModel.PostItemViewModel',
        '$.model.QueryPosts',
        '$.model.Post',
        'system.type.Array'
    ],
    properties: [
        {name: 'posts', type: 'Array<Post>', defaultValue: []},
        {name: 'page', type: 'int', defaultValue: 1},
        {name: 'count', type: 'int', defaultValue: 100},
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
            responsePipe: {
                onSuccess: function(ret) {
                    posts = ret;
                },

                onFailure: function(err) {
                }
            },

            responsePipe: [
                {
                    op : 'map',
                    action: function() {
                        closePage();
                    }
                }
            ]
        }
    }
}