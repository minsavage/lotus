/**
 * Created by danney on 16/2/22.
 */
module.exports = {
    name: 'WeibosViewController',
    type: 'ListViewController',
    viewModels: {
        master: {
            type: 'WeibosViewModel',
            name: 'weibosVM'
        }
    },
    event: {
        onCreateView: function() {
            prepareData();
        }
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'RelativeLayout',
            id: 'top',
            layout_width: 'match_parent',
            layout_height: '44dp',
            background: '#EEEEEE',
            units:[{
                type: 'ImageView',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_alignParentLeft: true,
                layout_centerVertical: true,
                paddingLeft: "12dp",
                src: '@drawable/navigationbar_friendattention'
            }, {
                type: 'ImageView',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_alignParentRight: true,
                layout_centerVertical: true,
                paddingRight: "12dp",
                src: '@drawable/navigationbar_icon_radar'
            }, {
                type: 'TextView',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_centerInParent: true,
                text: '我的微博',
                textSize: '20dp'
            }]
        }, {
            type: 'XListView',
            id: 'listView',
            layout_width: 'match_parent',
            layout_height: 'match_parent',
            layout_below: 'top',
            ptrMode: 'both',
            divider: "#EFEFEF",
            dividerHeight: "10dp",
            adapter: {
                listItem: 'WeiboItemViewController',
                listData: '@{weibosVM.weibos}'
            },
            event: {
                onItemClick: function() {
                    weibosVM.selectedWeibo = weibosVM.weibos.get(position);
                    showPage('WeiboDetailPage');
                }
            }
        }]
    }
}