/**
 * Created by danney on 15/12/4.
 */
var util = require('util');
var extend = util._extend;
var ViewBuilder = require('./viewBuilder');

var SimpleDraweeViewBuilder = function() {
    ViewBuilder.call(this);
}

util.inherits(SimpleDraweeViewBuilder, ViewBuilder);

SimpleDraweeViewBuilder.prototype._parseInternal = function(model) {
    var newModel = extend({}, model);
    delete newModel['lotus:uri'];

    return SimpleDraweeViewBuilder.super_.prototype._parseInternal.call(this, newModel);
}

module.exports = SimpleDraweeViewBuilder;