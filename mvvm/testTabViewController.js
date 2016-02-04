/**
 * Created by danney on 16/1/27.
 */
var tabViewController = {
    name: 'MainViewController',
    type: 'TabViewController',

    viewModel: {
        type: 'MainViewModel',
        name: 'mainVM'
    },

    bind: {
        'mainVM.audio': {

        }
    },

    event: {

    },

    content: {
        type: 'RelativeLayout',
        id:'xxx',
        units: [{
            type: 'TabHost',
            id: 'tabHost',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            layout_above: 'tabBar'
        }, {
            type: 'TabBar',
            id: 'tabBar',
            layout_width: 'match_parent',
            layout_height: '50dp',
            layout_alginParentBottom: true,
            units: [{
                type: 'TabButton',
                id: 'feedsButton',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                content: 'FeedsViewController',
                tag: '0'
            }, {
                type: 'TabButton',
                id: 'msgButton',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                content: 'MsgViewController',
                tag: '1'
            }, {
                type: 'TabButton',
                id: 'exploreButton',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                content: 'ExploreViewController',
                tag: '2'
            }, {
                type: 'TabButton',
                id: 'settingButton',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                content: 'SettingViewController',
                tag: '3'
            }]
        }]
    }
}