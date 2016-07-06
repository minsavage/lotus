/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'CommentsOperator',
    import: [
        '$.model.QueryComments',
        '$.model.Comment',
        'system.type.Array'
    ],
    type: 'remote',
    action: {
        query: {
            url: 'v1/replies',
            method: 'post',
            parameterType: 'json',
            parameters: [
                {name: 'post_id', type: 'int', canBeNull: false, retrofitType: 'json'},
                {name: 'page', type: 'int', canBeNull: false, retrofitType: 'json'},
                {name: 'count', type: 'int', canBeNull: false, retrofitType: 'json'}
            ],
            responseType: 'QueryComments',
            responseConverter: {
                convertedType: 'Array<Comment>',
                actions: [
                    {
                        op: 'map',
                        //action: function(queryComments) {
                        //    return queryComments.content.replies;
                        //}
                    }
                ]
            }
        }
    }
}