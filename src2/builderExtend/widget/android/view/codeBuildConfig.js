/**
 * Created by danney on 16/1/19.
 */
var path = require('path');
var lotus = require('../../../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));

module.exports = {
    name: 'View',
    import: [
        'android.view.View'
    ],
    event: {
        onClick: {
            name: 'OnClickListener',
            init: tpl.setOnClickListener,
            impl: tpl.onClickListener
        },

        onLongClick: {
            name: 'OnLongClickListener',
            init: 'qwe',
            impl: 'asd'
        }
    }
}