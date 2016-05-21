/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'RevealSquareViewModel',
    import: [
        '$.model.QueryForums',
        '$.model.Forum',
        'java.util.ArrayList'
    ],
    properties: [
        {name: 'forums', type: 'ArrayList<Forum>'}
    ],
    methods: {
        queryForums: {
            action: 'ForumsOperator.query',
            response: {
                onSuccess: function(ret) {

                },
                onFailure: function(err) {

                }
            }
        }
    }
}