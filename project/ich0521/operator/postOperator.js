/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'PostOperator',
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
            ],
            responseType: 'QueryPost',
            responseConverter: {
                convertedType: 'Post',
                actions: [
                    {
                        op: 'map',
                        //action: function(queryPost) {
                        //    return queryPost.content;
                        //}
                    }
                ]
            }
        }
    }
}