/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'PostsOperator',
    import: [
        '$.model.QueryPosts',
        '$.model.Post',
        'system.type.Array'
    ],
    type: 'remote',
    action: {
        query: {
            url: 'v1/forums',
            method: 'post',
            parameters: [
                {name: 'page', type: 'int', canBeNull: false, retrofitType: 'json'},
                {name: 'count', type: 'int', canBeNull: false, retrofitType: 'json'},
                {name: 'forum_id', type: 'int', canBeNull: false, retrofitType: 'json'}
            ],
            responseType: 'QueryPosts',
            responseConverter: {
                convertedType: 'Array<Post>',
                actions: [
                    {
                        op: 'map',
                        action: function(queryPosts) {
                            return queryPosts.content.posts;
                        }
                    }
                ]
            },

            response: {
                type: 'QueryPosts',
                dataPipe: [
                    {
                        op: 'map',
                        func: function(queryPosts) {
                            return queryPosts.content.posts;
                        }
                    },

                    {
                        op: 'done',
                        onSuccess: function() {

                        },

                        onFailure: function() {

                        }
                    }
                ]
            },

            responsePipe: {
                inputType: 'QueryPosts',
                outputType: 'Array<Post>',
                actions: [

                ]
            }
        }
    }
}