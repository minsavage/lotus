/**
 * Created by danney on 16/1/18.
 */

module.exports = {
    name: 'LoadingViewModel',

    properties: [
        {name: 'audio', type: 'Audio'},
        {name: 'isQueryCurrentAudioFinished', type: 'bool'},
        {name: 'isQueryAudioListFinished', type: 'bool'},
        {name: 'isPrepareDataFinished', type: 'bool'},
        {name: 'isError', type: 'bool'},
    ],

    operators: {
        AudiosOperator: {
            query: {
                requestParameters: [null, null],

                response: {
                    success: {
                        data: {
                            type: 'Collection<Audio>',
                            name: 'audios'
                        },
                        action: function(){
                            if(audios.size() > 0) {
                                setAudio(audios.get(0));
                                saveCurrentAudio();
                            }
                            else {
                                setIsError(true);
                            }
                        }
                    },

                    fail: {
                        action: {
                            isError: true
                        }
                    }
                }
            }
        },

        CurrentAudioOperator: {
            query: {
                response: {
                    success: {
                        data: {
                            type: 'Audio',
                            name: 'audioModel'
                        },
                        //action: {
                        //    'audio': 'audioModel',
                        //    isQueryCurrentAudioFinished: true
                        //}
                        action: function() {
                            if(audioModel == null) {
                                queryAudios();
                            }
                            else {
                                setIsPrepareDataFinished(true);
                            }
                        }
                    }
                }
            },
            save: {
                requestParameters: ['audio'],
                response: {
                    success: {
                        data: {
                            type: 'Audio',
                            name: 'audioModel'
                        },
                        action: function() {
                            setIsPrepareDataFinished(true);
                        }
                    }
                }
            }
        }
    }
}