/**
 * Created by danney on 16/2/18.
 */
module.exports = {
    name: 'MainViewModel',
    properties: [
        {name: 'audio', type: 'Audio'}
    ],

    operators: {
        CurrentAudioOperator: {
            query: {
                response: {
                    success: {
                        data: {
                            type: 'Audio',
                            name: 'audioModel'
                        },
                        action: function () {
                            audio = audioModel;
                        }
                    }
                }
            }
        }
    }
}