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
    operatedModel: 'QueryPosts',
    type: 'remote',
    action: {
        query: {
            url: 'v1/forums',
            method: 'post',
            parameterType: 'json',
            parameters: {
                page: {type: 'int', canBeNull: false},
                count: {type: 'int', canBeNull: false},
                forum_id: {type: 'int', canBeNull: false}
            },
            responseType: 'QueryPosts',
            responseConverter: {
                convertedType: 'Array<Post>',
                actions: [
                    {
                        op: 'map',
                        action: function(queryPosts) {
                            //if(queryPosts == null ||
                            //    queryPosts.content == null ||
                            //    queryPosts.content.posts == null) {
                            //    error();
                            //}

                            return queryPosts.content.posts;
                        }
                    }
                ]
            }
        }
    }
}