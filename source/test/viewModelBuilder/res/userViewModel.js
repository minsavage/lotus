/**
 * Created by danney on 16/4/24.
 */
module.exports = {
    import:['$.model.User'],
    name: 'UserViewModel',
    properties: [
        {name: 'userId', type: 'string'},
        {name: 'user', type: 'User'}
    ],

    methods: {
        queryUser: {
            action: 'UserOperator.query',
            parameters: {
                userId: '@{userId}'
            },
            response: {
                onSuccess: function (users) {

                },

                onFailure: function(err) {

                }
            }
        }
    }
}