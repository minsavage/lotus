/**
 * Created by danney on 15/12/2.
 */
var mainVC = {
    viewModel: {
        type: 'MainViewModel',
        name: 'mainVM'
    },

    content: {
        type: 'RelativeLayout',
        id: 'rootView',
        units:[
            {
                type: 'ListView',
                id: 'audioListView',
                layout: {
                    width: 'match_parent',
                    height: 'match_parent',
                    marginBottom: '50dp'
                },
                adapter: {
                    item: 'audioListItemVC'
                }
            },

            {
                type: 'RelativeLayout',
                id: 'bottomBar',
                layout: {

                }
            }
        ]
    }
}

var audioListItemVC = {
    viewModel: {
        type: 'AudioViewModel',
        name: 'audioVM'
    },

    content: {
        type: 'RelativeLayout',
        layout: {
            width: 'match_parent',
            height: 'match_parent'
        },
        units: [
            {
                type: 'ImageView',
                id: 'ivAudioCover',
                layout: {
                    width: 'match_parent',
                    height: 'match_parent'
                },
                src: '@{audioVM.coverPicUrl}'
            },

            {
                type: 'TextView',
                id: 'tvAudioName',
                layout: {
                    width: 'wrap_content',
                    height: 'wrap_content',
                    marginLeft: '10dp',
                    marginTop: '10dp'
                },
                text: '@{audioVM.name}'
            }
        ]
    }
}

var MainViewModel = {

}

public class Audio {
    private String name;
    private String coverUrl;
    private String bkgUrl;
    private String audioMusicUrl;
}



//public class AudioWithAction extends Audio {
//    void query(callback) {
//
//    }
//
//    void update(callback) {
//
//    }
//
//    void
//
//
//}

var audioModel = {
    fields: [
        {name: '_id', type: 'String', bind: {}},
        {name: 'name', type: 'String', bind: {}},
        {name: 'picCoverUrl', type: 'String', bind: {}},
        {name: 'picBkgUrl', type: 'String', bind: {}},
        {name: 'audioMix', type: 'String', bind: {}},
        {name: 'audioMusic', type: 'String', bind: {}},
        {name: 'audioVoice', type: 'String', bind: {}},
        {name: 'audioBackground', type: 'String', bind: {}},
    ]
}

var audioModel = {
    name: String,
    picCoverUrl: String,
    picBkgUrl: String,
    audioMix: String,
    audioMusic: String,
    audioVoice: String,
    audioBackground: String
}

var audioModel =


}

var audioListViewModelCollection = {
    name: '',
    resultType: 'collection', //  collection or object
    fields: [
        {name: '_id', type: 'String', bind: {}},
        {name: 'name', type: 'String', bind: {}},
        {name: 'picCoverUrl', type: 'String', bind: {}},
        {name: 'picBkgUrl', type: 'String', bind: {}},
        {name: 'audioMix', type: 'String', bind: {}},
        {name: 'audioMusic', type: 'String', bind: {}},
        {name: 'audioVoice', type: 'String', bind: {}},
        {name: 'audioBackground', type: 'String', bind: {}},
    ],
    action: {
        query: {}
    }
}


var audioModelOnSvr = {
    name: 'AudioModelOnSvr',
    fields: [
        {name: '_id', type: 'String'},
        {name: 'name', type: 'String'},
        {name: 'picCoverUrl', type: 'String'},
        {name: 'picBkgUrl', type: 'String'},
        {name: 'audioMix', type: 'String'}
    ]
}

var audioModelOnClient = {
    name: 'AudioModelOnClient',
    fields: [
        {name: '_id', type: 'String'},
        {name: 'name', type: 'String'},
        {name: 'picCoverUrl', type: 'String'},
        {name: 'picBkgUrl', type: 'String'},
        {name: 'audioMix', type: 'String'}
    ]
}

var audioModelOnClientOperator = {
    type: 'collection',
    bind: {
        'AudioModelOnClient._id': 'AudioModelOnSvr._id',
        'AudioModelOnClient.name': 'AudioModelOnSvr.name',
        'AudioModelOnClient.picCoverUrl': 'AudioModelOnSvr.picCoverUrl',
        'AudioModelOnClient.picBkgUrl': 'AudioModelOnSvr.picBkgUrl',
        'AudioModelOnClient.audioMix': 'AudioModelOnSvr.audioMix'
    },
    action: {
        query: {}
    }
}

var audioListViewModel = {
    name: 'AudioListViewModel',
    fields: [
        {name: 'currentAudioName', type: 'String'},
        {name: 'viewState', type: 'int'},
        {name: 'audioListAdapter', type: 'AudioListAdapter'},
    ]
}

//-------------

var alarmModel_clientdb = {
    name: 'AlarmModel_clientdb',
    fields: [
        {name: 'alarmEnabled', type: 'bool'},
        {name: 'alarmHour', type: 'int'},
        {name: 'alarmMinute', type: 'int'}
    ]
}

var alarmModel = {
    name: 'AlarmModel',
    fields: [
        {name: 'alarmEnabled', type: 'bool'},
        {name: 'alarmHour', type: 'int'},
        {name: 'alarmMinute', type: 'int'}
    ]
}

var alarmModelOperator = {
    crudType: 'local', // local db or remote db
    objectType: 'object', // object or collection
    action: {
        query:{},
        update: {},
        del: {}
    }
}

var alarmModelOperator = {
    crudType: 'local', // local db or remote db
    objectType: 'object', // object or collection
    action: {
        query:{},
        update: {},
        del: {}
    }
}
// 本地 对象， 本地集合， 远程对象， 远程集合

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
    ]
}