/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'ForumsOperator',
    import: ['$.model.QueryForums'],
    operatedModel: 'QueryForums',
    type: 'remote',
    action: {
        query: {
            resultType: 'object',
            url: 'v1/recom/3',
            parameters: {
                uid: {
                    type: 'int'
                }
            }
        }
    }
}