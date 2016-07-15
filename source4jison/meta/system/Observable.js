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
        returnType: 'Observable<T>',
        parameters:[{
            type: 'string',
            name: 'func'
        }]
    }]
}