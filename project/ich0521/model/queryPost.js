/**
 * Created by danney on 16/3/31.
 */
module.exports = {
    import: [
        '$.model.Post'
    ],

    name: 'QueryPost',
    properties: [
        {name: 'content', type: 'Post'},
        {name: 'info', type: 'string'},
        {name: 'retcode', type: 'int'}
    ]
}