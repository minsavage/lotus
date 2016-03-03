/**
 * Created by danney on 16/2/22.
 */
module.exports = {
    name: 'Comment',
    properties: [
        {name: 'content', type: 'string'},
        {name: 'weiboId', type: 'string'},
        {name: 'authorId', type: 'string'},
        {name: 'authorName', type: 'string'},
        {name: 'authorAvatarUrl', type: 'string'},
        {name: 'likeCount', type: 'int'}
    ]
}