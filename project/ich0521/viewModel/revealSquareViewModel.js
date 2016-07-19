/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'RevealSquareViewModel',
    import: [
        '$.operator.ForumsOperator',
        '$.model.QueryForums',
        '$.model.Forum',
        'system.type.Array'
    ],
    properties: [
        {name: 'forums', type: 'Array<Forum>',  defaultValue: []}
    ],
    methods: {
        queryForums: {
            action: 'ForumsOperator.query',
            responsePipe: [
                {
                    op : 'subscribe',
                    onSuccess: function(ret) {
                        forums = ret;
                    },
                    onFailure: function(err) {
                    }
                }
            ]
        }
    }
}