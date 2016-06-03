/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'ForumsOperator',
    import: [
        '$.model.QueryForums',
        '$.model.Forum',
        'java.util.List'
    ],
    operatedModel: 'QueryForums',
    type: 'remote',
    action: {
        query: {
            url: 'v1/recom/3',
            parameters: {
                uid: {
                    type: 'int'
                }
            },
            responseType: 'QueryForums',
            responseConverter: {
                convertedType: 'List<Forum>',
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