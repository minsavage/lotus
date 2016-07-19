/**
 * Created by danney on 16/7/9.
 */
module.exports = {
    name: 'HashMap',
    generics: {
        parameters:['K', 'V']
    },
    fields: [],
    methods: [
        {
            name: 'put', 
            returnType: 'void', 
            parameters: [{type: 'K',name: 'key'}, {type: 'V',name: 'value'}]
        }, 
        {
            name: 'get', 
            returnType: 'V', 
            parameters: [{type: 'K',name: 'key'}]
        }, 
        {
            name: 'get', 
            returnType: 'V', 
            parameters: [{type: 'K',name: 'key'}, {type: 'string',name: 'type'}]
        },
        {
            name: 'remove',
            returnType: 'void', 
            parameters: [{type: 'string',name: 'key'}]
        }
    ]
}