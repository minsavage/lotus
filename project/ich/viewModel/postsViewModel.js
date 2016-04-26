/**
 * Created by danney on 16/4/1.
 */
module.exports = {
    name: 'PostsViewModel',

    import: [
        '$.model.QueryPosts',
        '$.viewModel.PostItemViewModel',
        '$.enumeration.ListViewLoadingStatus',
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

    methods: {
        queryPosts: {
            action: 'PostsOperator.query',
            parameters: {
                page: '@{firstPage}',
                count: '@{count}',
                forum_id: '@{forum_id}'
            },
            response: {
                onSuccess: function (users) {
                },

                onFailure: function(err) {
                }
            }
        },
        queryMorePosts: {
            action: 'PostsOperator.query',
            parameters: {
                page: '@{nextPage}',
                count: '@{count}',
                forum_id: '@{forum_id}'
            },
            response: {
                onSuccess: function (users) {

                },

                onFailure: function(err) {

                }
            }
        }
    }

    //operators: {
    //    PostsOperator: {
    //        queryPosts: {
    //            type: 'query',
    //            requestParameters: ['firstPage', 'count', 'forum_id'],
    //            response: {
    //                success: {
    //                    data: {
    //                        type: 'QueryPosts',
    //                        name: 'queryPosts'
    //                    },
    //
    //                    action: function(){
    //                        //postList = queryPosts.content.posts;
    //                        listViewLoadingStatus = ListViewLoadingStatus.LoadSuccess;
    //                    }
    //                }
    //            }
    //        },
    //
    //        queryMorePosts: {
    //            type: 'query',
    //            requestParameters: ['nextPage', 'count', 'forum_id'],
    //            response: {
    //                success: {
    //                    data: {
    //                        type: 'QueryPosts',
    //                        name: 'queryPosts'
    //                    },
    //
    //                    action: function(){
    //                        //postList.addAll(queryPosts.content.posts);
    //                        listViewLoadingStatus = ListViewLoadingStatus.LoadSuccess;
    //                    }
    //                }
    //            }
    //        }
    //    }
    //}
}