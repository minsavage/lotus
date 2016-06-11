/**
 * Created by danney on 16/3/31.
 */
module.exports = {
    import: [
        '$.model.QueryForumContent'
    ],

    name: 'QueryForums',
    properties: [
        {name: 'content', type: 'QueryForumContent'},
        {name: 'info', type: 'string'},
        {name: 'retcode', type: 'int'}
    ]
}