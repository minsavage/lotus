/**
 * Created by danney on 16/4/18.
 */
module.exports = {
    name: 'AudiosOperator',
    model: 'Audio',
    type: 'remote',
    action: {
        query: {
            resultType: 'Collection',
            parameters: {
                path: {
                    type: 'string',
                    canBeNull: false
                }
            }
        }
    }
}