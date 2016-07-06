/**
 * Created by danney on 16/6/13.
 */
module.exports = {
    name: 'PostDetailTopViewModel',
    import: [
        '$.model.Post'
    ],
    properties: [
        {name: 'pid', type: 'int', defaultValue: 2910},
        {name: 'post', type: 'Post'}
    ],
    methods: {
        queryPost: {
            action: 'PostOperator.query',
            parameters: {
                pid: '@{pid}'
            },
            responsePipe: [
                {
                    op : 'subscribe',

                    onSuccess: function(ret) {
                        post = ret;
                    },

                    onFailure: function(err) {
                    }
                }
            ]
        }
    }
}