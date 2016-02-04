/**
 * Created by danney on 15/12/8.
 */

module.exports = {
    "name": "AudiosOperator",
    "model": "Audio",
    "accessType": "remote",
    "resultType": "collection",
    "action": {
        "query": {
            "parameters": {
                "maxTime": {
                    "type": "date",
                    "canBeNull": true
                },

                "minTime": {
                    "type": "date",
                    "canBeNull": true
                }
            },

            "condition": {
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