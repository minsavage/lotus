/**
 * Created by danney on 16/2/19.
 */
module.exports = {
    name: 'LoadingViewModel',

    properties: [
        {name: 'currentAudio', type: 'Audio'},
        {name: 'queryFinished', type: 'bool'},
        {name: 'queryOnlineFinished', type: 'bool'},
    ],

    operators: {
        CurrentAudioOperator: {
            query: {
                response: {
                    success: {
                        data: {
                            type: 'Audio',
                            name: 'audio'
                        },
                        action: function(){
                            currentAudio = audio;
                            queryFinished = true;
                        }
                    }
                }
            },

            save: {
                requestParameters: ['currentAudio'],

                response: {
                    success: {
                        data: {
                            type: 'Audio',
                            name: 'audio'
                        },
                        action: function() {
                            queryOnlineFinished = true;
                        }
                    }
                }
            }
        },

        AudiosOperator: {
            query: {
                response: {
                    success: {
                        data: {
                            type: 'Collection<Audio>',
                            name: 'audios'
                        },
                        action: function(){
                            currentAudio = audios.get(0);
                            saveCurrentAudio();
                        }
                    }
                }
            }
        }
    }
}