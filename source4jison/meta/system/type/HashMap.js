/**
 * Created by danney on 16/7/9.
 */
module.exports = {
    name: 'HashMap',
    generics: {
        parameters:['K', 'V']
    },
    fields: [],
    methods: [{
        name: 'put', 
        returnType: 'void', 
        parameters: [{
            type: 'K',
            name: 'key'
        }, {
            type: 'V',
            name: 'value'
        }]
    }]
}