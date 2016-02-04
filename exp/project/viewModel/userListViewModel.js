/**
 * Created by danney on 16/1/31.
 */
module.exports = {
    name: 'UserListViewModel',
    type: 'ListViewModel',
    list: {
        name: 'users',
        modelType: 'User',
        operator: 'UsersOperator',
        sortingField: {
            key: 'max',
            value: 'User.password'
        }
    }

    //properties: [
    //    {name: 'audio', type: 'Audio'},
    //    {name: 'currentTime', type: 'string'}
    //],
    //
    //operators: {
    //    AudiosOperator: {
    //        query: {
    //            response: {
    //                success: {
    //                    data: {
    //                        type: 'List<Audio>',
    //                        name: 'audios'
    //                    },
    //                    action: {}
    //                },
    //
    //                fail: {
    //                    action: {}
    //                }
    //            }
    //        }
    //    }
    //}
}