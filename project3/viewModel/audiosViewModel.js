/**
 * Created by danney on 16/2/2.
 */
module.exports = {
    name: 'AudiosViewModel',
    type: 'ListViewModel',
    list: {
        name: 'audios',
        modelType: 'Audio',
        operator: 'AudiosOperator',
        sortingField: {
            key: 'from',
            value: 'Audio.order'
        }
    }
}