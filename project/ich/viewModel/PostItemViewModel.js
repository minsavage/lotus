/**
 * Created by danney on 16/4/8.
 */
module.exports = {
    name: 'PostItemViewModel',

    import: [
        '$.model.Post'
    ],

    properties: [
        {name: 'index', type: 'int'},
        {name: 'post', type: 'Post'}
    ]
}