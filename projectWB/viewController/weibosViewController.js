/**
 * Created by danney on 16/2/7.
 */
module.exports = {
    name: 'WeibosViewController',
    type: 'ListViewController',
    viewModel: {
        type: 'WeibosViewModel',
        name: 'weibosVM'
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'RelativeLayout',
            id: 'topRelativeLayout',
            layout_width: 'match_parent',
            layout_height: '50dp',
            background: '#333333',
            units: [{
                type: 'TextView',
                id: 'tvCurrentGroupName',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                text: '我的微博'
            }]
        }, {
            type: 'XListView',
            id: 'lvWeibos',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            layout_below: 'topRelativeLayout',
            adapter: {
                type: 'default',
                listItem: 'WeiboItemViewController',
                listData: '@{weibosVM.weibos}'
            }
        }]
    }
}