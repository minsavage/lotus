/**
 * Created by danney on 16/6/11.
 */
module.exports = {
    name: 'PostDetailTopViewController',
    import:['$.viewModel.PostDetailTopViewModel'],
    viewModels: [{
        type: 'PostDetailTopViewModel',
        name: 'pdtVM',
        init: {
            pid: '@{props.pid}'
        }
    }],
    event: {
        onStart: function() {
            pdtVM.queryPost();
        }
    },
    content:{
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: '200dp',
        units: [{
            type: 'TextView',
            id: 'tvTitle',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{pdtVM.post.title}',
            textColor: '#3C19BE'
        },{
            type: 'TextView',
            id: 'tvName',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            layout_below: 'tvTitle',
            text: '@{pdtVM.post.author}',
            textColor: '#008000'
        },{
            type: 'XWebView',
            id: 'webView',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            layout_below: 'tvName',
            content: '@{pdtVM.post.detail}'
        }]
    }
}