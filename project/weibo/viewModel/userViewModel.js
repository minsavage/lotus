/**
 * Created by danney on 16/2/22.
 */
module.exports = {
    name: 'UserViewModel',
    properties: [
        {name: 'userId', type: 'string'},
        {name: 'user', type: 'User'}
    ],
    operators: {
        UsersOperator: {
            query: {
                requestParameters: ['userId'],
                response: {
                    success: {
                        data: {
                            type: 'Collection<User>',
                            name: 'users'
                        },
                        action: function(){
                            user = users.get(0);
                        }
                    }
                }
            }
        }
    }
}