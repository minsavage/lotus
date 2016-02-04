/**
 * Created by danney on 16/1/29.
 */
var listView = {
    name: 'MyListView',
    type: 'ListViewController',

    viewModel: {
        name: 'MainVM',
        type: 'MainViewModel'
    },

    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'ListView',
            id: 'listView',
            layout_width: 'match_parent',
            layout_height: 'match_parent',

            adapter: {
                type: 'staticPanelInFirstPosition',
                staticPanel: 'WeiboMsgDetailViewController',
                listItem: 'AudioItemViewController',
                listData: '@{MainVM.audioList}'
            },

            adapter: {
                type: 'default',
                listItem: 'AudioItemViewController',
                listData: '@{MainVM.audioList}'
            }
        }]
    }
}

var AudioItemViewController = {
    name: 'AudioItemViewController',
    viewModel: {
        name: 'aduioItemVM',
        type: 'AudioItemViewModel'
    },

    content: {
        type: 'RelativeLayout',
        units: [{
            type: 'ImageView',
            id: 'headImageView',
            uri: '@{aduioItemVM.headUrl}',
            event: {
                'onClick': {

                }
            }
        },{
            type: 'TextView',
            id: 'textView',
            text: '@{aduioItemVM.name}'
        }]
    }
}


var listViewModel = {
    name: 'myListViewModel',
    type: 'ListViewModel',
    listData: {
        name: 'audios',
        modelType: 'Audio',
        operator: 'AudiosOperator',
        sortingField: {
            key: 'from',
            value: 'Audio.order'
        }
    }
}

var operator = {
    name: 'AudiosOperator',
    model: 'Audio',
    accessType: 'remote',
    resultType: 'collection',
    action: {
        query: {
            parameters: {
                from: {type: 'int', canBeNull: true},
                to: {type: 'int', canBeNull: true}
            },

            condition: {
                order: {$gt: 'from', $lt: 'to'}
            },

            limit: 20,

            sort: {
                order: 1
            }
        }
    }
}