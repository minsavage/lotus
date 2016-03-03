/**
 * Created by danney on 16/2/22.
 */
module.exports = {
    name: 'UsersOperator',
    model: 'User',
    accessType: 'remote',
    resultType: 'collection',
    action: {
        query: {
            parameters: {
                userId: {
                    type: 'string',
                    canBeNull: false
                }
            },
            condition: {
                objectId: 'userId'
            }
        }
    },
    bind: {
        collections: [
            {name: 'user', type: 'master'}
        ],
        map: {
            name: 'user.name',
            avatarUrl: 'user.avatarUrl'
        }
    }
}