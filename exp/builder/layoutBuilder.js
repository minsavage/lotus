/**
 * Created by danney on 15/11/23.
 */
var mustache = require('mustache');
var tpl = require('./template');
var extend = require('util')._extend;

var LayoutBuilder = function() {
    this._propertyBuilderMap = {
        'id': this._idBuilder,
        'layout': this._layoutPropertyBuilder,
        'units': this._unitsBuilder
    }

    this._namespaceRecorder = {};
}

LayoutBuilder.prototype.parse = function(model) {
    console.log('parse enter');

    if(model.type == undefined || model.type == null) {
        throw 'no type field to build';
    }

    var ret = this._typeBuilder(model, true);

    return mustache.render(tpl.xmlRoot, {content: ret});
}

LayoutBuilder.prototype._typeBuilder = function(model, isRoot) {
    //todo: 检测type合法性
    var typeName = model['type'];
    console.log('_typeBuilder enter, type = ' + typeName);

    var propertiesStr = "";
    var unitsStr = "";

    for(var key in model) {
        if(key == 'type' ||
           key == 'viewModel' ||
           key == 'event' ||
           key == 'bind') {
            //console.log('ignore, continue');
            continue;
        }

        var builder = this._propertyBuilderMap[key];
        if (builder == null) {
            var ret = this._simplePropertyBuilder(key, model[key]);
            if(ret != null) {
                propertiesStr += ret + ' \r';
            }
            continue;
        }

        var v = model[key];
        var ret = builder(this, model[key]);

        if(key == 'units') {
            unitsStr = ret;
        }
        else {
            propertiesStr += ret + ' \r';
        }
    }

    var namespace = '';
    if(isRoot == true) {
        namespace = this._namespaceBuilder();
    }

    var renderResult = mustache.render(tpl.type, {
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

        if(v.type == 'ViewController') {
            units += self._viewControllerBuilder(v) + '\r';
        }
        else {
            units += self._typeBuilder(v, false) + '\r';
        }
    }

    return units;
}

LayoutBuilder.prototype._layoutPropertyBuilder = function(self, model) {
    var prefix = 'android:layout_';
    var ret = '';
    for(var key in model) {
        ret += prefix + key + '="' + model[key] + '" \r'
    }
    return ret;
}

LayoutBuilder.prototype._simplePropertyBuilder = function(key, v) {
    if(typeof(v) != 'string') {
        return;
    }

    var prefix = "android:";
    if(key.indexOf(':') > 0) {
        var array = key.split(':');
        var namespace = array[0];
        this._namespaceRecorder[namespace] = true;
        prefix = '';
    }

    return prefix + key + '="' + v + '"';
}

LayoutBuilder.prototype._namespaceBuilder = function() {
    var ret = '';
    var ns_android = 'xmlns:android="http://schemas.android.com/apk/res/android"';

    for(var key in this._namespaceRecorder) {
        ret += mustache.render(tpl.namespace, {namespace: key})
    }

    return ns_android + '\r' + ret;
}

LayoutBuilder.prototype._viewControllerBuilder = function(model) {
    var obj = extend({}, model);
    model.type = 'FrameLayout';
    model.id = model.id + 'Container';
    delete model['name'];
    return this._typeBuilder(model, false);
}


module.exports = LayoutBuilder;