/**
 * Created by danney on 16/3/31.
 */
module.exports = {
    import: [
        'system.type.Array',
        '$.model.Comment'
    ],

    name: 'QueryCommentsContent',

    properties: [
        {name: 'is_end', type: 'int'},
        {name: 'next_page', type: 'int'},
        {name: 'post_id', type: 'int'},
        {name: 'replies', type: 'Array<Comment>'}
    ]
}