/**
 * Created by danney on 16/4/18.
 */
module.exports = {
    name: 'AudiosViewModel',

    import: [
        '$.model.Audio'
    ],

    properties: [
        {name: 'currentAudioName', type: 'string'},
        {name: 'aduios', type: 'ArrayList<Audio>'}
    ],

    operators: {
        AudiosOperator: {
            query: {
                type: 'query',
                request: {
                    path: '@{this.audios}'
                },
                response: {
                    success: function(result){
                        this.audios = result
                    },

                    failed: function(error) {
                        if(error.code == 0) {

                        }
                        else if(error.code = 1) {

                        }
                        else {

                        }
                    }
                }
            }
        }
    }
}