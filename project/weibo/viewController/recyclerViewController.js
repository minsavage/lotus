/**
 * Created by danney on 16/2/27.
 */
module.exports = {
    name: 'RecyclerViewController',
    viewModels: {
        master: {
            type: 'RecyclerViewModel',
            name: 'recyclerVM'
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