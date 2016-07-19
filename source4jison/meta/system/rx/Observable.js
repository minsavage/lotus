/**
 * Created by danney on 16/7/14.
 */
module.exports = {
    import:['system.rx.MapFunc'],
    name: 'Observable',
    generics:{
        parameters:['T']
    },
    fields: [],
    methods: [
        {
            name: 'map',
            generics:{parameters:['R']},
            returnType: 'Observable<R>',
            parameters:[{type: 'MapFunc<T, R>', name: 'func'}]
        },
        {
            name: 'filter',
            returnType: 'Observable<T>',
            parameters:[{type: 'MapFunc<T, bool>', name: 'func'}]
        }
    ]
}