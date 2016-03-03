/**
 * Created by danney on 16/2/22.
 */
module.exports = {
    name: 'CommentsOperator',
    model: 'Comment',
    accessType: 'remote',
    resultType: 'collection',
    action: {
        query: {
            parameters: {
                weiboId: {
                    type: 'string',
                    canBeNull: false
                }
            },

            condition: {
                weiboId: 'weiboId'
            },

            sort: {
                createTime: 1
            },

            limit: 50
        }
    },

    bind: {
        collections: [
            {name: 'comment', type: 'master'},
            {name: 'user', type: 'secondary', condition: {objectId: 'comment.authorId'}}
        ],

        map: {
            content: 'comment.content',
            weiboId: 'comment.weiboId',
            authorId: 'comment.authorId',
            authorName: 'user.authorName',
            authorAvatarUrl: 'user.authorAvatarUrl',
            likeCount: 'comment.likeCount'
        }
    }
}