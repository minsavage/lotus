/**
 * Created by danney on 16/5/21.
 */
module.exports = {
    name: 'PostsViewModel',
    import: [
        '$.viewModel.PostItemViewModel',
        '$.model.QueryPosts',
        '$.model.Post',
        'system.type.Array'
    ],
    properties: [
        {name: 'posts', type: 'Array<Post>', defaultValue: []},
        {name: 'page', type: 'int', defaultValue: 1},
        {name: 'count', type: 'int', defaultValue: 100},
        {name: 'forumId', type: 'int'}
    ],
    methods: {
        queryPosts: {
            action: 'PostsOperator.query',
            parameters: {
                page: '@{page}',
                count: '@{count}',
                forum_id: '@{forumId}'
            },
            response: {
                onSuccess: function(ret) {
                    posts = ret;
                },

                onFailure: function(err) {
                }
            },

            responseType: '',
            //responseHandler: [{
            //    op: 'map',
            //    func: function (item) {
            //        var pivm = new PostItemViewModel();
            //        pivm.post = item;
            //        return pivm;
            //    }
            //}, {
            //    op: 'filter',
            //    func: function () {
            //
            //    }
            //}, {
            //    op: 'done',
            //    onSuccess: function() {
            //
            //    },
            //    onFail: function() {
            //
            //    }
            //}]
        }
    }
}

methods: [
    {
        name: 'query',
        parameters: [{
            type: 'int',
            name: 'pid'
        }, {
            type: 'Map',
            name: 'map'
        }],
        returnType: 'Observable<ArrayList<Post>>',
        annotations: [
            'OVERRIDE'
        ],
        func: function() {
            postsOperator.query

        }
    }
]

methods: [
    {
        name: 'query',
        parameters: [],
        returnType: null,
        annotations: [
            'OVERRIDE'
        ],
        func: function() {
            var map = new Map();
            map['pid'] = pid;

            postsOperator.query(pid, map)
                .arrayMap(function (item) {
                    var pivm = new PostItemViewModel();
                    pivm.post = item;
                    return pivm;
                })
                .done(function(pivms){

                }, function(e){

                });
        }
    }
]