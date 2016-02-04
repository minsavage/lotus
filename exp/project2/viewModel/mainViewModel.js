/**
 * Created by danney on 15/12/8.
 */

module.exports = {
    name: 'MainViewModel',

    properties: [
        {name: 'audio', type: 'Audio'},
        {name: 'currentTime', type: 'string'},
        {name: 'alarmEnabled', type: 'bool'},
        {name: 'alarmHour', type: 'int'},
        {name: 'alarmMinute', type: 'int'},
        {name: 'lastAlarmTimeExist', type: 'bool'},
        {name: 'playerStatus', type: 'int'},
        {name: 'localAudioFileExist', type: 'bool'},
    ],

    operators: {
        AudiosOperator: {
            query: {
                requestParameters: [
                    null,
                    null
                ],

                response: {
                    success: {
                        data: {
                            type: 'Collection<Audio>',
                            name: 'audios'
                        },
                        action: {}
                    },

                    fail: {
                        action: {}
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
                        action: {
                            'audio': 'audioModel'
                        }
                    }
                }
            }
        }
    }
}