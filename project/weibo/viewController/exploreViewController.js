/**
 * Created by danney on 16/2/26.
 */
module.exports = {
    name: 'ExploreViewController',
    viewModels: {
        master: {
            type: 'ExploreViewModel',
            name: 'exploreVM'
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
            text: 'ExploreViewController'
        }]
    }
}