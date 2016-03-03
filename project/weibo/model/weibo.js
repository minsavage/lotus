/**
 * Created by danney on 16/2/22.
 */
module.exports = {
    name: 'Weibo',
    properties: [
        {name: 'createTime', type: 'date'},
        {name: 'content', type: 'string'},
        {name: 'authorId', type: 'string'},
        {name: 'authorName', type: 'string'},
        {name: 'authorAvatarUrl', type: 'string'},
        {name: 'commentCount', type: 'int'},
        {name: 'likeCount', type: 'int'}
    ]
}