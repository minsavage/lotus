/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'PostDetailViewModel',
    import: [
        //'$.viewModel.PostItemViewModel',
        '$.operator.CommentsOperator',
        '$.model.QueryComments',
        '$.model.Comment',
        'system.type.Array'
    ],
    properties: [
        {name: 'pid', type: 'int'},
        {name: 'page', type: 'int', defaultValue: 1},
        {name: 'count', type: 'int', defaultValue: 100},
        {name: 'comments', type: 'Array<Comment>', defaultValue: []},
    ],
    methods: {
        queryComments: {
            action: 'CommentsOperator.query',
            parameters: {
                page: '@{page}',
                count: '@{count}',
                post_id: '@{pid}'
            },
            responsePipe: [
                {
                    op : 'subscribe',

                    onSuccess: function(ret) {
                        comments = ret;
                    },

                    onFailure: function(err) {
                    }
                }
            ]
        }
    }
}