/**
 * Created by danney on 16/2/22.
 */
module.exports = {
    name: 'PostsOperator',
    model: 'QueryPosts',
    accessType: 'remote',
    resultType: 'object',
    action: {
        query: {
            url: 'v1/forums',
            method: 'post',
            parameterType: 'json', //'formUrlEncoded'
            parameters: {
                page: {
                    type: 'int',
                    canBeNull: false
                },

                count: {
                    type: 'int',
                    canBeNull: false
                },

                forum_id: {
                    type: 'int',
                    canBeNull: false
                }
            },

            condition: {
                createTime: {
                    $lt: 'from'
                }
            },

            sort: {
                createTime: 1
            },

            limit: 50
        }
    }

    //bind: {
    //    collections: [
    //        {name: 'weibo', type: 'master'},
    //        {name: 'user', type: 'secondary', condition: {objectId: 'weibo.authorId'}}
    //    ],
    //
    //    map: {
    //        content: 'weibo.content',
    //        authorId: 'weibo.authorId',
    //        commentCount: 'weibo.commentCount',
    //        likeCount: 'weibo.likeCount',
    //        authorName: 'user.name',
    //        authorAvatarUrl: 'user.avatarUrl'
    //    }
    //}
}