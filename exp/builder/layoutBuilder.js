/**
 * Created by danney on 15/11/23.
 */
var ejs = require('ejs');
var tpl = require('./template');


var LayoutBuilder = function() {
    this._propertyBuilderMap = {
        'id': this._idBuilder,
        'layout': this._unitsBuilder,
        'units': this._unitsBuilder
    }
}

LayoutBuilder.prototype.parse = function() {
    console.log('parse enter');

    if(model.type == undefined || model.type == null) {
        throw 'no type field to build';
    }

    return this._typeBuilder(model);
}

layoutBuilder.prototype = {
    _propertyBuilderMap: null,

    parse: function(model) {

    },

    _typeBuilder: function(model) {
        //todo: 检测type合法性

        var properties = "";
        var units = "";

        for(key in model) {
            console.log('key = ' + key);

            var builder = this._propertyBuilderMap[key];
            if(builder == null || key == 'type') {
                console.log('no builder, continue');
                continue;
            }

            console.log('found builder');

            var ret = builder(model);
            if(key == 'units') {
                units = ret;
            }
            else {
                properties += ret + '\r';
            }
        }

        var renderResult = ejs.render(tpl.type, {
            typeName: model.type,
            properties: properties,
            units: units
        });

        //console.log(renderResult);

        return renderResult;
    },

    _idBuilder: function(model) {
        return 'android:id="@+id/' + model.id + '"'
    },

    _layoutPropertyBuilder: function(model) {
        return 'layout = ...';
    },

    _unitsBuilder: function(model) {
        var units = "";
        for(key in model) {
            var v = model[key];
            console.log('type builder = ' + this._typeBuilder);

            units += layoutBuilder._typeBuilder(v) + '\r';
        }
        return units;
    }
}




module.exports = layoutBuilder;