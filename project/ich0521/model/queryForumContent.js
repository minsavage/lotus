/**
 * Created by danney on 16/3/31.
 */
module.exports = {
    name: 'QueryForumContent',
    import: [
        '$.model.Forum',
        'system.type.Array'
    ],
    properties: [
        {name: 'recom', type: 'Array<Forum>'},
    ]
}