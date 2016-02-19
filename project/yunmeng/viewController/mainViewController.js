/**
 * Created by danney on 16/2/18.
 */
module.exports = {
    name: 'MainViewController',
    viewModels: {
        master: {
            type: 'MainViewModel',
            name: 'mainVM'
        }
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent'
    }
}