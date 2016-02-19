/**
 * Created by danney on 16/2/6.
 */
module.exports = {
    name: 'Weibo',
    properties: [
        {name: 'objectId', type: 'string'},
        {name: 'content', type: 'string'},
        {name: 'createTime', type: 'date'},
        {name: 'commentCount', type: 'int'},
        {name: 'likeCount', type: 'int'},
        {name: 'authorId', type: 'string'},
        {name: 'authorName', type: 'string'},
        {name: 'authorAvatarUrl', type: 'string'}
    ]
}