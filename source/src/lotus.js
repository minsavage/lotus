/**
 * Created by danney on 16/2/3.
 */
var lotus = {
    util: {
        stringUtil: require('./util/stringUtil'),
        variableTypeUtil: require('./util/variableTypeUtil'),
        codeGenerateUtil: require('./util/codeGenerateUtil'),
        jsCodeUtil: require('./util/jsCodeUtil'),
        objectUtil: require('./util/objectUtil'),
        nameUtil: require('./util/nameUtil'),
        actionTranslateUtil: require('./util/actionTranslateUtil'),
        dataBindingUtil: require('./util/dataBindingUtil'),
        importUtil: require('./util/importUtil')
    },

    recorder: {
        ImportRecorder: require('./recorder/importRecorder2'),
        LayoutRecorder: require('./recorder/layoutRecorder'),
        CodeRecorder: require('./recorder/codeRecorder'),
        GradleRecorder: require('./recorder/GradleRecorder')
    },

    template: require('./template'),

    projectConfig: require('./projectConfig'),

    modelMgr: require('./modelMgr'),

    builderMgr: require('./builderMgr')
}

module.exports = lotus;