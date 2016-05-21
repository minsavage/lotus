/**
 * Created by danney on 16/5/18.
 */
module.exports = {
    name: 'WeiboItemViewController',
    viewModels: {
        master: {
            type: 'Weibo',
            name: 'weibo'
        }
    },
    content: {
        type: 'LinearLayout',
        layout_width: 'match_parent',
        layout_height: 'wrap_content',
        orientation: 'vertical',
        units: [{
            type: 'RelativeLayout',
            layout_width: 'match_parent',
            layout_height: 'wrap_content',
            layout_marginTop: '10dp',
            layout_marginLeft: '10dp',
            layout_marginBottom: '10dp',
            units: [{
                type: 'XImageView',
                id: 'ivAuthorAvatar',
                layout_width: '40dp',
                layout_height: '40dp',
                uri: '@{weibo.authorAvatarUrl}',
                event: {
                    onClick: function () {
                        weibosVM.selectedWeibo = getModel(v);
                        showPage('UserPage');
                    }
                }
            }, {
                type: 'TextView',
                id: 'tvAuthorName',
                layout_width: 'wrap_content',
                layout_height: 'wrap_content',
                layout_toRightOf: 'ivAuthorAvatar',
                layout_marginLeft: '10dp',
                text: '@{weibo.authorName}',
                textSize: '16dp',
                event: {
                    onClick: function () {
                    }
                }
            }]
        }, {
            type: 'TextView',
            id: 'tvContent',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            layout_margin: '10dp',
            text: '@{weibo.content}',
            textSize: '16dp'
        }, {
            type: 'View',
            layout_width: 'match_parent',
            layout_height: '0.3dp',
            background: '#BBBBBB'
        }, {
            type: 'LinearLayout',
            layout_width: 'match_parent',
            layout_height: '36dp',
            orientation: 'horizontal',
            units: [{
                type: 'RelativeLayout',
                id: 'rlRetweet',
                layout_width: 'match_parent',
                layout_height: 'match_parent',
                layout_weight: '1.0',
                units:[{
                    type: 'LinearLayout',
                    layout_width: 'wrap_content',
                    layout_height: 'wrap_content',
                    layout_centerInParent: "true",
                    units: [{
                        type: 'ImageView',
                        layout_width: 'wrap_content',
                        layout_height: 'wrap_content',
                        layout_marginRight: '10dp'
                    }, {
                        type: 'TextView',
                        layout_width: 'wrap_content',
                        layout_height: 'wrap_content',
                        text: '转发'
                    }]
                }],
                event: {
                    onClick: function() {

                    }
                }
            }, {
                type: 'View',
                layout_width: '0.3dp',
                layout_height: 'match_parent',
                background: '#BBBBBB'
            }, {
                type: 'RelativeLayout',
                id: 'rlComment',
                layout_width: 'match_parent',
                layout_height: 'match_parent',
                layout_weight: '1.0',
                units:[{
                    type: 'LinearLayout',
                    layout_width: 'wrap_content',
                    layout_height: 'wrap_content',
                    layout_centerInParent: "true",
                    units: [{
                        type: 'ImageView',
                        layout_width: 'wrap_content',
                        layout_height: 'wrap_content',
                        layout_marginRight: '10dp',
                    }, {
                        type: 'TextView',
                        layout_width: 'wrap_content',
                        layout_height: 'wrap_content',
                        text: '转发'
                    }]
                }],
                event: {
                    onClick: function() {

                    }
                }
            }, {
                type: 'View',
                layout_width: '0.3dp',
                layout_height: 'match_parent',
                background: '#BBBBBB'
            }, {
                type: 'RelativeLayout',
                layout_width: 'match_parent',
                layout_height: 'match_parent',
                layout_weight: '1.0',
                units:[{
                    type: 'LinearLayout',
                    layout_width: 'wrap_content',
                    layout_height: 'wrap_content',
                    layout_centerInParent: "true",
                    units: [{
                        type: 'ImageView',
                        layout_width: 'wrap_content',
                        layout_height: 'wrap_content',
                        layout_marginRight: '10dp',
                    }, {
                        type: 'TextView',
                        id: 'ivLikeBtn',
                        layout_width: 'wrap_content',
                        layout_height: 'wrap_content',
                        text: '@{weibo.likeCount}'
                    }]
                }]
            }]
        }, {
            type: 'View',
            layout_width: 'match_parent',
            layout_height: '0.3dp',
            background: '#BBBBBB'
        }]
    }
}