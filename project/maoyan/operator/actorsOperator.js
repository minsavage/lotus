/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'ActorsOperator',
    import: [],
    type: 'http',
    action: {
        query: {
            url: 'mmdb/v6/movie/{mid}/celebrities.json',
            method: 'get',
            parameters: [
                { name: 'mid', type: 'int', canBeNull: false, paramType: 'path' },
                { name: 'test', type: 'int', canBeNull: false, paramType: 'json' },
            ],
            responseType: 'QueryPost',
            responseConverter: {
                convertedType: 'Post',
                actions: [
                    {
                        op: 'map',
                        action: function (ret) {
                            return ret.data;
                        }
                    }
                ]
            }
        }
    }
}