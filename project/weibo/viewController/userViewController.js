/**
 * Created by danney on 16/2/22.
 */
module.exports = {
    name: 'UserViewController',
    viewModels: {
        master: {
            type: 'UserViewModel',
            name: 'userVM'
        },
        slave: [
            {
                type: 'WeibosViewModel',
                name: 'weibosVM'
            }
        ],
        init: function () {
            userVM.userId = weibosVM.selectedWeibo.authorId;
        }
    },
    event: {
        onCreateView: function() {
            userVM.queryUsers();
        }
    },
    content: {
        type: 'RelativeLayout',
        layout_width: 'match_parent',
        layout_height: 'match_parent',
        units: [{
            type: 'TextView',
            id: 'tvName',
            layout_width: 'wrap_content',
            layout_height: 'wrap_content',
            text: '@{userVM.user.name}'
        }]
    }
}