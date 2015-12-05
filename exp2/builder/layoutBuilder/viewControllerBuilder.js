/**
 * Created by danney on 15/12/4.
 */
var util = require('util');
var tpl = require('../template');
var mustache = require('mustache');
var ViewBuilder = require('./viewBuilder');

var ViewControllerBuilder = function() {
    ViewBuilder.call(this);

    this._propertyBuilderMap['id'] = ViewControllerBuilder.prototype._buildId;
}

util.inherits(ViewControllerBuilder, ViewBuilder);

ViewControllerBuilder.prototype.parse = function(model) {
    var extend = require('util')._extend;
    var newModel = extend({}, model);
    delete newModel.name;

    var ret = this._parseInternal(newModel);

    var renderResult = mustache.render(tpl.layout.view, {
        typeName: 'FrameLayout',
        properties: ret
    });

    return renderResult;
}

//ViewControllerBuilder.prototype._parseInternal = function(model) {
//    var extend = require('util')._extend;
//    var newModel = extend({}, model);
//    delete newModel.name;
//
//    return ViewControllerBuilder.super_.prototype._parseInternal.call(this, newModel);
//}

ViewControllerBuilder.prototype._buildId = function(k, v) {
    return this.namespace + ':id="@+id/' + v + 'Container"';
}

module.exports = ViewControllerBuilder;