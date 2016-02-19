/**
 * Created by danney on 16/2/6.
 */
module.exports = {
    name: 'GroupsOperator',
    model: 'Group',
    accessType: 'remote',
    resultType: 'collection',
    action: {
        query: {
            parameters: {
                userId: {
                    type: 'string',
                    canBeNull: false
                },

                condition: {
                    userId: 'userId'
                }
            }
        }
    },

    bind: {
        collections: [
            {name: 'group', type: 'master'}
        ],
        map: {
            name: 'group.name',
            userId: 'group.userId'
        }
    }
}