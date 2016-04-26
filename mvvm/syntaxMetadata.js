/**
 * Created by danney on 16/4/26.
 */
var operatorSyntax = {
    name: {
        type: 'string',
        description: 'operator name, it will be used to be a class name for operator'
    },
    operatedModel: {
        type: 'string',
        description: ''
    },
    type: {
        type: 'string',
        valueScope: ['remote', 'local'],
        description: ''
    },
    import: {
        optional: true,
        type: 'array',
        units:[
            {
                optional: false,
                type: 'string'
            }
        ]
    },
    action: {
        type: 'object',
        units: {
            resultType: {
                type: 'string',
                valueScope: ['object', 'collection'],
                description: ''
            },

            url: {
                optional: true,
                type: 'string'
            },
            method: {
                type: 'string',
                valueScope: ['get', 'post']
            },
            parameterType: {
                type: 'string',
                valueScope: ['json', 'formUrlEncoded'],
                optional: {
                    type: 'dependency',
                    field: 'action.method',
                    value: 'post'
                }
            }
        }
    }
}