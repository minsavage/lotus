/**
 * Created by danney on 16/7/15.
 */
var x = {
    import: [
        '$.interface.MapFunc'
    ],

    methods: [
        {
            name: 'map',
            returnType: 'Observable<R>',
            parameters:[
                {
                    name: 'func',
                    type: 'MapFunc<T, R>'
                },
            ]
        }
    ]
}

var t = {
    type: 'FunctionInterface',
    name: 'MapFunc',
    returnType: 'R',
    parameters: ['T']
}