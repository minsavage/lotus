var x = {
    type: 'XListView',
    id: 'listView',
    layout_width: 'match_parent',
    layout_height: 'match_parent',
    layout_below: 'top',
    ptrMode: 'both',
    divider: "#EFEFEF",
    dividerHeight: "10dp",
    adapter: {
        fixPanel: {
            item: 'WeiboItemViewController'
        },
        list: {
            listItem: 'WeiboItemViewController',
            listData: '@{weibosVM.weibos}'
        }
    }
};

var setting = {
    name: 'SettingItem',
    properties: [
        {name: 'title', type: 'string'},
        {name: 'icon', type: 'int'}
    ]
}

var viewModel = {
    name: 'SettingViewModel',
    properties: [
        {name: 'settingItems', type: 'Collection<SettingItem>', init: [
            {name: '个人中心', icon: '@drawable/user_center'},
            {name: '通用设置', icon: '@drawable/basic_setting'}
        ]}
    ]
}

var x = {
    type: 'XListView',
    id: 'listView',
    adapter: {
        listItem: 'WeiboItemViewController',
        listData: '@{weibosVM.weibos}'
    }
};

var x = {
    type: 'XListView',
    id: 'listView',
    adapter: {
        type: 'static',
        itemView: 'WeiboItemViewController',
        dataSource: '@{weibosVM.settings}'
    }
};

var x = {
    type: 'XListView',
    id: 'listView',
    adapter: {
        type: 'fixPanel',
        fixPanel: {
            item: 'TopViewController',
            position: 0
        },
        item: 'WeiboItemViewController',
        dataSource: '@{weibosVM.weibos}'
    }
};

var x = {
    type: 'XListView',
    id: 'listView',
    adapter: {
        items: {
            search: {
                type: 'fix',
                item: 'TopViewController'
            },

            weibo: {
                type: 'dynamic',
                item: 'WeiboItemViewController',
                dataSource: '@{weibosVM.weibos}',
                getPosition: function() {
                    return position-1;
                }
            }
        },

        getTypeByPosition: function() {
            if(position == 0) {
                return 'search';
            }
            else {
                return 'weibo';
            }
        }
    }
};