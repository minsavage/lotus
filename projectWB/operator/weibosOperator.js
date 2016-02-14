/**
 * Created by danney on 16/2/6.
 */
module.exports = {
    name: 'WeibosOperator',
    model: 'Weibo',
    accessType: 'remote',
    resultType: 'collection',
    action: {
        query: {
            parameters: {
                from: {
                    type: 'date',
                    canBeNull: true
                }
            },

            condition: {
                createTime: {
                    $lt: 'from'
                }
            },

            limit: 50,

            sort: {
                createTime: -1
            }
        }
    }
}