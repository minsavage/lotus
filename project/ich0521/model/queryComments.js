/**
 * Created by danney on 16/3/31.
 */
module.exports = {
    import: [
        '$.model.QueryCommentsContent'
    ],

    name: 'QueryComments',
    properties: [
        {name: 'content', type: 'QueryCommentsContent'},
        {name: 'info', type: 'string'},
        {name: 'retcode', type: 'int'}
    ]
}