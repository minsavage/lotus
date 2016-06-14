/**
 * Created by danney on 16/6/13.
 */
module.exports = {
    name: 'Comment',
    import:[
        '$.model.CommentReply',
        'system.type.Array'
    ],
    properties: [
        {name: 'r_id', type: 'int'},
        {name: 'r_uid', type: 'int'},
        {name: 'r_floor', type: 'int'},
        {name: 'r_uname', type: 'string'},
        {name: 'r_etime', type: 'int'},
        {name: 'r_time', type: 'int'},
        {name: 'r_text', type: 'string'},
        {name: 'inner_cnt', type: 'int'},
        {name: 'inners', type: 'Array<CommentReply>'}
    ]
}