/**
 * Created by danney on 16/2/2.
 */
module.exports = {
    "name": "AudiosOperator",
    "model": "Audio",
    "accessType": "remote",
    "resultType": "collection",
    action: {
        "query": {
            parameters: {

            },

            condition: {
                "createTime": {
                    "$lt": "maxTime",
                    "$gt": "minType"
                }
            },

            "limit": 20,

            "sort": {
                "createTime": 1
            }
        }
    }
}