/**
 * Created by danney on 16/2/17.
 */
module.exports = {
    name: "AudiosOperator",
    model: "Audio",
    accessType: "remote",
    resultType: "collection",
    action: {
        query: {
            parameters: {},

            condition: {
                pubStatus: 1
            },

            sort: {
                order: 1
            }
        }
    },

    bind: {
        collections: [
            {name: 'audio', type: 'master'}
        ],
        map: {
            name: 'audio.name',
            picBkgUrl: 'audio.picBkgUrl',
            picCoverUrl: 'audio.picCoverUrl',
            audioMixUrl: 'audio.audioMix',
            audioMusicUrl: 'audio.audioMusic',
            audioVoiceUrl: 'audio.audioVoice',
            audioBkgUrl: 'audio.audioBkg',
            order: 'audio.order'
        }
    }
}