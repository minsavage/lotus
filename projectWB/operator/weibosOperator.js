/**
 * Created by danney on 16/2/6.
 */
module.exports = {
    name: 'WeibosOperator',
    model: 'Weibo',
    accessType: 'remote',
    resultType: 'collection',
    action: {
        query: {
            parameters: {
                from: {
                    type: 'date',
                    canBeNull: true
                }
            },

            condition: {
                createTime: {
                    $lt: 'from'
                }
            },

            limit: 50,

            sort: {
                createTime: -1
            }
        }
    },

    bind: {
        type: 'multiSchema',
        collections: [
            {name: 'weibo', type: 'master'},
            {name: 'user', type: 'secondary', condition: {objectId: 'weibo.authorId'} }
        ],
        map: {
            content: 'weibo.content',
            commentCount: 'weibo.commentCount',
            likeCount: 'weibo.likeCount',
            authorId: 'weibo.authorId',
            authorName: 'user.name',
            authorAvatarUrl: 'user.avatarUrl'
        }
    }
}