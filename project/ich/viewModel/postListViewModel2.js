/**
 * Created by danney on 16/4/1.
 */
module.exports = {
    name: 'PostListViewModel',
    type: 'ListViewModel',
    list: {
        name: 'postList',
        modelType: 'Post',
        operator: 'PostsOperator',
        sortingField: {
            key: 'from',
            value: 'Post.pid'
        },

        event: {
            query: function() {

            },

            queryMore: function() {

            },


            canLoadMore: function() {

            }
        }
    },
    properties: [
        {name: 'firstPage', type: 'int', default: 1},
        {name: 'page', type: 'int'},
        {name: 'count', type: 'int', default: 100},
        {name: 'forumId', type: 'int'},
    ],

    operators: {
        PostsOperator: {
            query: {
                requestParameters: ['page', 'count', 'forum_id'],

                requestParameters: {
                    'page': 'this.firstPage',
                    'count': 100,
                    'forum_id': 'this.forumId'
                },

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