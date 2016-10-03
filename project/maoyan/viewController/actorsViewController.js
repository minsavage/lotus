module.exports = {
    name: 'ActorsViewController',
    import: [
        'sys.view.View',
        'sys.view.Text',
        'sys.view.Image',
        'sys.view.TouchableOpacity',
        'sys.view.LayoutAnimation',
        'sys.view.ListView',
        '$.viewModel.ActorsViewModel'
    ],
    viewModels: [{
        type: 'ActorsViewModel',
        name: 'actorsVM',
        init: {
            mid: '@{props.mid}',
            m2: '123',
            m3: 12
        }
    }],
    event: {
        componentDidMount: function () {
            this.actorsVM.queryActors();
        }
    },
    content: {
        type: 'View',
        id: 'root',
        style: {},
        units: [{
            type: 'View',
            id: 'top',
            style: {},
            units: [{
                type: 'Text',
                id: 'text',
                test: 123,
                style: {
                    flex: 1,
                    padding: '@{audioVM.padding}'
                },
                units: [{
                    type: 'Plain',
                    content: '全部'
                }]
            }]
        }, {
                type: 'ListView',
                id: 'listView',
                horizontal: true,
                enableEmptySections: true,
                style: {},
                dataSource: '@{actorsVM.actors}',
                renderRow: ''
            }]
    }
}