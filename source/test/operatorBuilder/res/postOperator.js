/**
 * Created by danney on 16/6/12.
 */
module.exports = {
    name: 'PostsOperator',
    import: [
        '$.model.QueryPost',
        '$.model.Post',
    ],
    type: 'remote',
    action: {
        query: {
            url: 'v1/posts/{pid}',
            method: 'get',
            parameters: [
                {name: 'pid', type: 'int', canBeNull: false, retrofitType: 'path'},
                {name: 't', type: 'int', canBeNull: false, retrofitType: 'queryMap'},
                {name: 't', type: 'int', canBeNull: false, retrofitType: 'json'},
            ],
            responseType: 'QueryPost',
            responseConverter: {
                convertedType: 'Post',
                actions: [
                    {
                        op: 'map',
                        action: function(queryPost) {
                            return queryPost.content;
                        }
                    }
                ]
            }
        }
    }
}