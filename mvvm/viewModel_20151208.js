/**
 * Created by danney on 15/12/8.
 */

var mainViewModel = {
    name: 'MainViewModel',

    fields: [
        {name: 'audio', type: 'Audio'},
        {name: 'currentTime', type: 'String'},
        {name: 'alarmEnabled', type: 'bool'},
        {name: 'alarmHour', type: 'int'},
        {name: 'alarmMinute', type: 'int'},
        {name: 'lastAlarmTimeExist', type: 'bool'},
        {name: 'playerStatus', type: 'int'},
        {name: 'localAudioFileExist', type: 'bool'},
    ],

    operator: {
        'CurrentAudioOperator': {
            model: {
                type: 'Audio',
                name: 'audioModel'
            },

            query: {
                success: {
                    'audio': 'audioModel' // left = field, right = result
                }
            },

            save: {
                success: {
                    'audio': 'audioModel'
                }
            }
        },

        'AlarmModelOperator': {
            model: {
                type: 'Audio',
                name: 'audio'
            },

            query: {
                success: {
                    'alarmHour': 'audio.alarmHour',
                    'alarmMinute': 'audio.alarmMinute',
                    'alarmEnabled': 'audio.alarmEnabled'
                },
                fail: {

                }
            },

            save: {

            }

            //insert: {
            //    success: {
            //
            //    },
            //    fail: {
            //
            //    }
            //}
        }
    }
}