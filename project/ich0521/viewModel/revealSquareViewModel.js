/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'RevealSquareViewModel',
    import: [
        '$.model.QueryForums',
        '$.model.Forum',
        'java.util.List',
        'java.util.ArrayList'
    ],
    properties: [
        {name: 'forums', type: 'List<Forum>'}
    ],
    methods: {
        queryForums: {
            action: 'ForumsOperator.query',
            response: {
                onSuccess: function(ret) {
                    forums = ret;
                },
                onFailure: function(err) {

                }
            }
        }
    }
}