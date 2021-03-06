/**
 * Created by danney on 16/2/26.
 */
module.exports = {
    name: 'UserCenterViewController',
    viewModels: {
        master: {
            type: 'UserCenterViewModel',
            name: 'ucVM'
        }
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units:[{
            type: 'TextView',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: 'UserCenterViewController',
            name: '@{user.name}'
            uri: '@{user.avatarUrl}'

        }]
    }
}