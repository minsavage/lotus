/**
 * Created by zouqin on 16/5/10.
 */
module.exports = {
    type: 'RecyclerView',
    id: 'testRecyclerView',
    layout_width: 'match_parent',
    layout_height: 'match_parent',
    adapter: {
        item: 'ItemViewController',
        dataSource: '@{weibosVM.weibos}'
    }
}