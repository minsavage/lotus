/**
 * Created by danney on 16/4/1.
 */
module.exports = {
    name: 'PostsViewModel',

    import: [
        '$.viewModel.PostItemViewModel',
        '$.enum.ListViewLoadingStatus',
        'java.util.ArrayList'
    ],

    properties: [
        {name: 'postList', type: 'ArrayList<PostItemViewModel>'},
        {name: 'loadMoreEnable', type: 'bool'},
        {name: 'listViewLoadingStatus', type: 'ListViewLoadingStatus'},

        {name: 'firstPage', type: 'int', default: 1},
        {name: 'nextPage', type: 'int'},
        {name: 'page', type: 'int'},
        {name: 'count', type: 'int', default: 100},
        {name: 'forum_id', type: 'int'}
    ],

    operators: {
        PostsOperator: {
            queryPosts: {
                type: 'query',
                requestParameters: ['firstPage', 'count', 'forum_id'],
                response: {
                    success: {
                        data: {
                            type: 'QueryPosts',
                            name: 'queryPosts'
                        },

                        action: function(){
                            //postList = queryPosts.content.posts;
                            listViewLoadingStatus = ListViewLoadingStatus.LoadSuccess;
                        }
                    }
                }
            },

            queryMorePosts: {
                type: 'query',
                requestParameters: ['nextPage', 'count', 'forum_id'],
                response: {
                    success: {
                        data: {
                            type: 'QueryPosts',
                            name: 'queryPosts'
                        },

                        action: function(){
                            //postList.addAll(queryPosts.content.posts);
                            listViewLoadingStatus = ListViewLoadingStatus.LoadSuccess;
                        }
                    }
                }
            }
        }
    }
}