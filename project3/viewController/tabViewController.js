/**
 * Created by danney on 16/2/2.
 */
module.exports = {
    name: 'MainTabViewController',

    type: 'TabViewController',

    viewModel: {
        name: 'mainTabVM',
        type: 'MainTabViewModel'
    },

    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'TabContainer',
            id: 'tabContainer',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            layout_above: 'tabBar'
        }, {
            type: 'TabBar',
            id: 'tabBar',
            layout_width: 'match_parent',
            layout_height: '50dp',
            layout_alignParentBottom: true,
            orientation: 'horizontal',
            units: [{
                type: 'TabButton',
                id: 'btn0',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_weight: '1.0',
                checked: 'true',
                content: 'AudiosViewController'
            }, {
                type: 'TabButton',
                id: 'btn1',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_weight: '1.0',
                content: 'SubTabViewController'
            }]
        }]
    }
}