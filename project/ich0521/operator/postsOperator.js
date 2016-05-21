/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'PostsOperator',
    import: ['$.model.QueryPosts'],
    operatedModel: 'QueryPosts',
    type: 'remote',
    action: {
        query: {
            resultType: 'object',
            url: 'v1/forums',
            method: 'post',
            parameterType: 'json',
            parameters: {
                page: {
                    type: 'int',
                    canBeNull: false
                },
                count: {
                    type: 'int',
                    canBeNull: false
                },
                forum_id: {
                    type: 'int',
                    canBeNull: false
                }
            }
        }
    }
}