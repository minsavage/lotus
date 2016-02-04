/**
 * Created by danney on 16/1/31.
 */
module.exports = {
    name: 'AudioListViewModel',
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