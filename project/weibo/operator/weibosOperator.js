/**
 * Created by danney on 16/2/22.
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

            sort: {
                createTime: 1
            },

            limit: 50
        }
    },

    bind: {
        collections: [
            {name: 'weibo', type: 'master'},
            {name: 'user', type: 'secondary', condition: {objectId: 'weibo.authorId'}}
        ],

        map: {
            content: 'weibo.content',
            authorId: 'weibo.authorId',
            commentCount: 'weibo.commentCount',
            likeCount: 'weibo.likeCount',
            authorName: 'user.name',
            authorAvatarUrl: 'user.avatarUrl'
        }
    }
}