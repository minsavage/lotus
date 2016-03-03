/**
 * Created by danney on 16/2/26.
 */
module.exports = {
    name: 'MainViewController',
    type: 'TabViewController',
    viewModels: {
        master: {
            type: 'MainViewModel',
            name: 'mainVM'
        }
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
            layout_alignParentBottom: 'true',
            orientation: 'horizontal',
            units: [{
                type: 'TabButton',
                id: 'timeLineTabBtn',
                layout_width: 'match_parent',
                layout_height: 'match_parent',
                layout_weight: "1.0",
                content: 'WeibosViewController',
                checked: 'true'
            }, {
                type: 'TabButton',
                id: 'msgTabBtn',
                layout_width: 'match_parent',
                layout_height: 'match_parent',
                layout_weight: "1.0",
                content: 'MsgViewController'
            }, {
                type: 'ImageView',
                id: 'ivWriteWeibo',
                layout_width: 'match_parent',
                layout_height: 'match_parent',
                layout_weight: "1.0",
                background: '#333333'
            }, {
                type: 'TabButton',
                id: 'exploreTabBtn',
                layout_width: 'match_parent',
                layout_height: 'match_parent',
                layout_weight: "1.0",
                content: 'ExploreViewController'
            }, {
                type: 'TabButton',
                id: 'ucTabBtn',
                layout_width: 'match_parent',
                layout_height: 'match_parent',
                layout_weight: "1.0",
                content: 'UserCenterViewController'
            }]
        }]
    }
}