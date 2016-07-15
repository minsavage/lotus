/**
 * Created by danney on 16/7/9.
 */
module.exports = {
    name: 'HashMap',
    generics: {
        size: 2,
        parameters:['T', 'K']
    },
    fields: [],
    methods: [{
        name: 'put', 
        returnType: 'void', 
        parameters: [{
            type: 'T',
            name: 'key'
        }]
    }]
}