/**
 * Created by danney on 16/2/22.
 */
module.exports = {
    name: 'WeiboDetailViewController',
    viewModels: {
        master: {
            type: 'WeiboDetailViewModel',
            name: 'detailVM'
        },
        slave: [
            {
                type: 'WeibosViewModel',
                name: 'weibosVM'
            }
        ],
        init: function() {
            //detailVM.weibo = weibosVM.selectedWeibo;
        }
    },
    event: {
        onCreateView: function(){
            detailVM.weibo = weibosVM.selectedWeibo;
        }
    },

    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units:[{
            type: 'LinearLayout',
            layout_width: 'match_parent',
            layout_height: 'wrap_content',
            orientation: 'vertical',
            background: '#666666',
            units: [{
                type: 'RelativeLayout',
                layout_width: 'match_parent',
                layout_height: '50dp',
                units: [{
                    type: 'XImageView',
                    id: 'ivAuthorAvatar',
                    layout_width: '30dp',
                    layout_height: '30dp',
                    uri: '@{detailVM.weibo.authorAvatarUrl}'
                }, {
                    type: 'TextView',
                    id: 'tvAuthorName',
                    layout_width: 'wrap_content',
                    layout_height: 'wrap_content',
                    layout_marginLeft: '40dp',
                    text: '@{detailVM.weibo.authorName}'
                }]
            }, {
                type: 'TextView',
                id: 'tvContent',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                text: '@{detailVM.weibo.content}'
            }]
        }]
    }
}