/**
 * Created by danney on 16/7/14.
 */
module.exports = {
    name: 'Observable',
    generics:{
        parameters:['T']
    },
    fields: [],
    methods: [{
        name: 'map',
        returnType: 'Observable<R>',
        parameters:[{
            type: 'MapFunc<T, R>',
            name: 'func'
        }]
    }]
}

// x = {
//     type: 'method',
//     generics: {
//         parameters: ['T', 'R']
//     },
//     name: 'MapFunc',
//     parameters: [{
//         type: 'T'
//     }],
//     returnType: 'R'
// }