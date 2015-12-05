/**
 * Created by danney on 15/12/4.
 */
var tpl = require('../template');
var mustache = require('mustache');

var ViewBuilder = function() {}

ViewBuilder.prototype.namespace = 'android';
ViewBuilder.prototype.namespaceList = {
    'android': true
};

ViewBuilder.prototype.parse = function(model) {
    var ret = this._parseInternal(model);

    var renderResult = mustache.render(tpl.layout.view, {
        typeName: model.type,
        properties: ret
    });

    return renderResult;
}

ViewBuilder.prototype._parseInternal = function(model) {
    var ret = '';

    for(var key in model) {
        if(key == 'type' || key == 'event') {
            continue;
        }

        var buildProperty = this._findPropertyBuilder(key);
        ret += buildProperty.call(this, key, model[key]) + ' ';
    }

    return ret;
}

ViewBuilder.prototype._findPropertyBuilder = function(k) {
    if(this._propertyBuilderMap[k] != null) {
        return this._propertyBuilderMap[k];
    }
    else {
        return this._buildBaseProperty;
    }
}

ViewBuilder.prototype._buildBaseProperty = function(k, v) {
    if(typeof(v) != 'string') {
        throw ('this is not a base property, k = ' + k + ', v = ' + JSON.stringify(v));
    }

    //检查属性名字里面是否含有namespace，有的话则保存起来
    if(k.indexOf(':') > 0) {
        var namespace = k.split(':')[0];
        this.addNamespace(namespace);
        return k + '="' + v + '"';
    }
    else {
        return this.namespace + ':' + k + '="' + v + '"';
    }
}

ViewBuilder.prototype._buildId = function(k, v) {
    return this.namespace + ':id="@+id/' + v + '"';
}

ViewBuilder.prototype._buildLayout = function(k, v) {
    var prefix = this.namespace + ':layout_';
    var ret = '';
    var model = v;
    for(var key in model) {
        var right = model[key];
        if(key == 'below' || key == 'above' || key == 'alignBaseline' ||
           key == 'alignTop' || key == 'alignBottom' || key == 'alignLeft' || key == 'alignRight' ||
           key == 'toStartOf' || key == 'toEndOf' || key == 'toLeftOf' || key == 'toRightOf') {
            right = '@+id/' + right;
        }

        ret += prefix + key + '="' + right + '" '
    }
    return ret;
}

ViewBuilder.prototype.addNamespace = function(namespace) {
    ViewBuilder.prototype.namespaceList[namespace] = true;
}

ViewBuilder.prototype.getNamespaceList = function() {
    var list = [];
    for(var k in ViewBuilder.prototype.namespaceList) {
        list.push(k);
    }
    return list;
}

ViewBuilder.prototype._propertyBuilderMap = {
    'id': ViewBuilder.prototype._buildId,
    'layout': ViewBuilder.prototype._buildLayout
}

module.exports = ViewBuilder;