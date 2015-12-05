/**
 * Created by danney on 15/12/4.
 */
var ViewBuilder = require('./viewBuilder');
var ViewGroupBuilder = require('./viewGroupBuilder');
var ViewControllerBuilder = require('./viewControllerBuilder');
var SimpleDraweeViewBuilder = require('./simpleDraweeViewBuilder');

var LayoutBuilderMgr = function() {
    this._map = {
        'RelativeLayout': ViewGroupBuilder,
        'FrameLayout': ViewGroupBuilder,
        'ViewController': ViewControllerBuilder,

        //自定义控件
        'com.facebook.drawee.view.SimpleDraweeView': SimpleDraweeViewBuilder
    }
}

LayoutBuilderMgr.prototype._map = null;

LayoutBuilderMgr.prototype.find = function(viewName) {
    var builder = this._map[viewName];
    if(builder == null) {
        builder = ViewBuilder;
    }
    return builder;
}

module.exports = LayoutBuilderMgr;