/**
 * Created by danney on 16/2/6.
 */
module.exports = {
    name: 'WeibosViewModel',
    type: 'ListViewModel',
    list: {
        name: 'weibos',
        modelType: 'Weibo',
        operator: 'WeibosOperator',
        sortingField: {
            key: 'from',
            value: 'Weibo.createTime'
        }
    },

    properties: [
        {name: 'currentGroupName', type: 'string'}
    ]
}