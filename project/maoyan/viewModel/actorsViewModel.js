module.exports = {
    name: 'ActorsViewModel',
    import: [
        '$.operator.ActorsOperator'
    ],
    properties: [
        { name: 'actors', type: 'Array<Actor>', defaultValue: [] },
        { name: 'mid', type: 'int', defaultValue: 0 }
    ],
    methods: {
        queryActors: {
            action: 'ActorsOperator.query',
            parameters: {
                mid: '@{mid}'
            },
            responsePipe: [{
                op: 'subscribe',
                success: function (ret) {
                    this.actors = this.actors.concat(ret.actors);
                },
                error: function (err) {

                }
            }]
        }
    }
}