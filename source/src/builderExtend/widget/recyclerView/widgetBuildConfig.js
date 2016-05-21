/**
 * Created by danney on 16/2/17.
 */
var path = require('path');
var lotus = require('../../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var view = require('../android/view/codeBuildConfig');
var extend = require('util')._extend;

module.exports = {
    import: [
        'android.support.v7.widget.RecyclerView',
        'android.support.v7.widget.LinearLayoutManager'
    ],

    event: extend({
        onItemClick: {
            name: 'OnItemClickListener',
            init: tpl.setOnItemClickListener,
            impl: tpl.onItemClickListener
        }
    }, view.event)
}