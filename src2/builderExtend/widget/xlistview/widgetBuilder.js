/**
 * Created by danney on 16/2/17.
 */
var util = require('util');
var lotus = require('../../../lotus')
var mustache = require('mustache');
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var WidgetBuilder = lotus.builderMgr.queryWidgetBuilder();

var XListViewBuilder = function() {
    WidgetBuilder.call(this);
};

util.inherits(XListViewBuilder, WidgetBuilder);

XListViewBuilder.prototype.parse = function(model, buildConfig) {
    if(!this._needParse(model, buildConfig)) {
        return;
    }

    if(!util.isNullOrUndefined(buildConfig.name)) {
        this.modelType = buildConfig.name;
    }
    else {
        this.modelType = model.type;
    }

    this._buildEvent(model, buildConfig);

    return this._codeRecorder;
}

module.exports = XListViewBuilder;