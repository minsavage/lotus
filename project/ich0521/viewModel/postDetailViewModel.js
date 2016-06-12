/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'PostDetailViewModel',
    import: [
        '$.model.Post'
    ],
    properties: [
        {name: 'pid', type: 'int'},
        {name: 'post', type: 'Post'}
    ],
    methods: {
        queryPost: {
            action: 'PostOperator.query',
            parameters: {
                pid: '@{pid}'
            },
            response: {
                onSuccess: function(ret) {
                    post = ret;
                },

                onFailure: function(err) {
                }
            }
        }
    }
}