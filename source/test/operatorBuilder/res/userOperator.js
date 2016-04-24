/**
 * Created by danney on 16/4/23.
 */
module.exports = {
    import: ['$.model.User'],
    name: 'UsersOperator',
    type: 'remote',
    operatedModel: 'User',
    action: {
        query: {
            resultType: 'object',

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