/**
 * Created by danney on 15/11/23.
 */
//var ejs = require('ejs');
//var mustache = require('mustache');
//var tpl = require('./template');

var x = "<{{{typeName}}} {{{namespace}}} {{{properties}}}> {{{units}}} </{{{typeName}}}>";
var tpl = {};
tpl.type = x;




var LayoutBuilder = function() {
    this._propertyBuilderMap = {
        'id': this._idBuilder,
        //'layout': this._unitsBuilder,
        'units': this._unitsBuilder
    }
}

LayoutBuilder.prototype.parse = function(model) {
    console.log('parse enter');

    if(model.type == undefined || model.type == null) {
        throw 'no type field to build';
    }

    var ret = this._typeBuilder(model, true);
    //console.log('-------------final------------');
    //console.log(ret);
    return ret;
}

LayoutBuilder.prototype._typeBuilder = function(model, isRoot) {
    //todo: 检测type合法性
    var typeName = model['type'];
    console.log('_typeBuilder enter, type = ' + typeName);

    var propertiesStr = "";
    var unitsStr = "";

    //var key;
    for(var key in model) {
        var builder = this._propertyBuilderMap[key];
        if(builder == null || key == 'type') {
            //console.log('no builder, continue');
            continue;
        }

        var v = model[key];

        console.log('----------------key: ' + key);
        console.log('----------------v: ' + v);

        var ret = builder(this, model[key]);

        console.log('----------------ret: ' + ret);

        if(key == 'units') {
            unitsStr = ret;
        }
        else {
            propertiesStr += ret + '\r';
        }
    }

    var namespace = '';
    if(isRoot == true) {
        namespace = 'xmlns:android="http://schemas.android.com/apk/res/android"'

        //console.log('properties: ' + propertiesStr);
        //console.log('units: ' + unitsStr);

    }

    console.log(tpl.type);

    var renderResult = Mustache.render(tpl.type, {
        typeName: typeName,
        namespace: namespace,
        properties: propertiesStr,
        units: unitsStr
    });

    return renderResult;
}

LayoutBuilder.prototype._idBuilder = function(self, id) {
    return 'android:id="@+id/' + id + '"';
}

LayoutBuilder.prototype._unitsBuilder = function(self, model) {
    var units = "";
    for(key in model) {
        var v = model[key];
        //console.log('_unitsBuilder-----------');
        //console.log(v);
        units += self._typeBuilder(v, false) + '\r';
    }

    //console.log(units);
    return units;
}



//module.exports = LayoutBuilder;