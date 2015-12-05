/**
 * Created by danney on 15/12/4.
 */
var util = require('util');
var tpl = require('../template');
var mustache = require('mustache');
var ViewBuilder = require('./viewBuilder');

var ViewGroupBuilder = function() {
    ViewBuilder.call(this);

    this._propertyBuilderMap['units'] = ViewGroupBuilder.prototype._buildUnits;
}

util.inherits(ViewGroupBuilder, ViewBuilder);

ViewGroupBuilder.prototype.parse = function(model) {
    var extend = require('util')._extend;
    var newModel = extend({}, model);
    delete newModel.units;

    var propertiesStr = this._parseInternal(newModel);
    var unitsStr = this._buildUnits('units', model.units);

    var templateStr = tpl.layout.viewGroup;
    if(unitsStr == null || unitsStr == '') {
        templateStr = tpl.layout.view;
    }

    var renderResult = mustache.render(templateStr, {
        typeName: model.type,
        namespace: '',
        properties: propertiesStr,
        units: unitsStr
    });

    return renderResult;
}


ViewGroupBuilder.prototype._buildUnits = function(k, v) {
    var units = '';
    var model = v;

    for(var key in model) {
        var subModel = model[key];

        if(subModel.type == undefined || subModel.type == null) {
            throw 'type field missing, mode = ' + JSON.stringify(subModel);
        }

        var LayoutBuilderMgr = require('./layoutBuilderMgr');
        var layoutBuilderMgr = new LayoutBuilderMgr();
        var Builder = layoutBuilderMgr.find(subModel.type);
        var builder = new Builder();
        if(builder) {
            units += builder.parse(subModel) + '\r';;
        }
        else {
            throw 'do not recognized type: ' + subModel.type;
        }
    }
    return units;
}

module.exports = ViewGroupBuilder;
