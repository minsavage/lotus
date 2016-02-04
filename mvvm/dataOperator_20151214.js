/**
 * Created by danney on 15/12/14.
 */
var currentAudioOperator = {
    name: 'CurrentAudioOperator',
    model: 'Audio',
    accessType: 'local', // or remote
    resultType: 'object', // or collection
    bindType: 'modelAsSchema' //'multiSchema'
}

var alarmOperator = {
    name: 'AlarmOperator',
    model: 'Alarm',
    accessType: 'local', // or remote
    resultType: 'object', // or collection
    bindType: 'modelAsSchema', //'multiSchema'
    canBeNull: true // 如果不存在时，否是可以为null值， true则返回null， false 则创建一个对象，所有属性都用默认值填充
}

var audioListOperator = {
    name: 'AudioListOperator',
    model: 'Audio',
    accessType: 'remote',
    resultType: 'collection',
    bindType: 'modelAsSchema',
    action: {
        query: {
            selector: {
                maxTime: {
                    type: Date,
                    bind: 'createTime',
                    comparison: '$lte'
                },
                minTime: {
                    type: Date,
                    bind: 'createTime',
                    comparison: '$gt'
                }
            },
            limit: 100
        }
    }
}

//
//var currentAudioOperator = {
//    name: 'CurrentAudioOperator',
//    model: 'Audio',
//    accessType: 'local', // or remote
//    resultType: 'object', // or collection
//    bindType: 'multiSchema', //'modelAsSchema',
//    bind: {
//        'audio._id': 'audioSvr._id',
//        'audio.name': 'audioSvr.name',
//        'audio.authorName': {
//            field: 'user.name',
//            get: 'findOne({_id: audioSvr.authorId})'
//        }
//    }
//}

var commentListOperator = {
    name: 'CommentListOperator',
    model: 'AudioComment',
    accessType: 'remote',
    resultType: 'collection',
    bindType: 'multiSchema',
    bind: {
        _id: 'comment._id',
        msg: 'comment.msg',
        date: 'comment.createTime',
        authorId: 'comment.authorId',
        authorName: {
            field: 'user.name',
            get: 'findOne({_id: comment._id})'
        },
        authorAvatar: {
            field: 'user.avatar',
            get: 'findOne({_id: comment._id})'
        },
        likeCount: 'comment.likeCount'
    },
    action: {
        query: {
            selector: {
                audioId: {
                    type: 'String',
                    bind: 'audioId',
                    comparison: '$eq',
                    canBeNull: false
                },
                maxTime: {
                    type: 'Date',
                    bind: 'createTime',
                    comparison: '$lte'
                },
                minTime: {
                    type: 'Date',
                    bind: 'createTime',
                    comparison: '$gt'
                }
            },
            limit: 100
        },

        add: {
            selector: {

            }
        }
    }
}

//insert xxxtable (value1, value2, value3, value4) in ()
//排序规则 怎么定义