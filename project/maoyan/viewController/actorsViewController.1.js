module.exports = {
    name: 'ActorsViewController',
    import: ['$.viewModel.ActorsViewModel'],
    viewModels: [{
        type: 'ActorsViewModel',
        name: 'actorsVM',
        init: {
            mid: '@{props.mid}'
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
        units:[{
            type: 'View',
            id: 'top',
            style:{},
            units:[{
                type: 'Text',
                id: '',
                content: '全部'
            }]
        }, {
            type: 'ListView',
            horizontal: true,
            enableEmptySections: true,
            style: {},
            dataSource: '@{actorsVM.actors}',
            renderRow: ''
        }]
    }
}