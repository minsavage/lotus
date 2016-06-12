/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'ForumsOperator',
    import: [
        '$.model.QueryForums',
        '$.model.Forum',
        'system.type.Array'
    ],
    operatedModel: 'QueryForums',
    type: 'remote',
    action: {
        query: {
            url: 'v1/recom/3',
            parameters: [
                {name: 'uid', type: 'int', canBeNull: false, retrofitType: 'queryMap'}
            ],
            responseType: 'QueryForums',
            responseConverter: {
                convertedType: 'Array<Forum>',
                actions: [
                    {
                        op: 'map',
                        action: function(queryForums) {
                            //if(queryPosts == null ||
                            //    queryPosts.content == null ||
                            //    queryPosts.content.posts == null) {
                            //    error();
                            //}

                            return queryForums.content.recom;
                        }
                    }
                ]
            }
        }
    }
}