/**
 * Created by danney on 16/3/31.
 */
module.exports = {
    import: [
        'java.util.List'
    ],

    name: 'QueryPostContent',

    properties: [
        {name: 'is_end', type: 'int'},
        {name: 'forum_name', type: 'string'},
        {name: 'next_page', type: 'int'},
        {name: 'forum_id', type: 'int'},
        {name: 'posts', type: 'List<Post>'},
    ]
}