/**
 * Created by danney on 15/12/4.
 */
var tpl = require('../template');
var mustache = require('mustache');
var extend = require('util')._extend;

var DataBindingBuilder = function() {

}
DataBindingBuilder.prototype.packageName = '';

DataBindingBuilder.prototype.parse = function(model) {
    var LayoutBuilderMgr = require('./layoutBuilderMgr');
    var layoutBuilderMgr = new LayoutBuilderMgr();
    var Builder = layoutBuilderMgr.find(model.content.type);
    var builder = new Builder();

    var contentStr = builder.parse(model.content);
    var nsList = builder.getNamespaceList();
    var nsStr = this._buildNamespace(nsList);

    var viewModelType = this.packageName + '.viewModel.' + model.viewModel.type;
    var renderResult = mustache.render(tpl.layout.databinding, {
        namespace: nsStr,
        viewModelName: model.viewModel.name,
        viewModelType: viewModelType,
        content: contentStr
    });
    return renderResult;
}

DataBindingBuilder.prototype._buildNamespace = function(namespaceList) {
    var nsStr = '';
    for(var k in namespaceList) {
        var str = ''
        var name = namespaceList[k];
        if(name == 'android') {
            str = 'xmlns:android="http://schemas.android.com/apk/res/android" '
        }
        else {
            str = 'xmlns:' + name + '="http://schemas.android.com/apk/res-auto" ';
        }
        nsStr += str
    }
    return nsStr;
}

module.exports = DataBindingBuilder;