/**
 * Created by danney on 16/2/7.
 */
module.exports = {
    config: {
        layoutOnly: true,
        layoutDataBinding: false
    },
    name: 'WeiboItemViewController',
    viewModel: {
        type: 'Weibo',
        name: 'weibo'
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: '50dp',
        background: '#123456',
        units:[{
            type: 'XImageView',
            id: 'imageView',
            layout_width: '50dp',
            layout_height: '50dp',
            uri: '@{weibo.authorAvatarUrl}'
        },{
            type: 'TextView',
            id: 'tvCreateTime',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{weibo.createTime}',
            event: {
                onClick: function() {
                    showPage('UserDetailPage', function(){
                        //mainVM = getViewModel('MainViewModel');
                        //detailVM.weibo = mainVM.currentClickItem;
                    })
                }
            }
        }]
    }
}