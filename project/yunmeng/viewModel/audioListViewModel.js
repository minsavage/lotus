/**
 * Created by danney on 16/2/17.
 */
module.exports = {
    name: 'AudioListViewModel',
    type: 'ListViewModel',
    list: {
        name: 'audioList',
        modelType: 'Audio',
        operator: 'AudiosOperator',
        sortingField: {
            key: 'order',
            value: 'Audio.order'
        }
    },
    properties:[
        {name: 'currentAudioName', type: 'string'},
        {name: 'selectedAudio', type: 'Audio'}
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
                        action: {
                        }
                    }
                }
            },

            save: {
                requestParameters: ['selectedAudio'],

                response: {
                    success: {
                        data: {
                            type: 'Audio',
                            name: 'audio'
                        },
                        action: {
                        }
                    }
                }
            }
        }
    }
}