/**
 * Created by danney on 16/2/1.
 */
var util = require('util');
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var stringUtil = lotus.util.stringUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var projectConfig = lotus.projectConfig;
var modelMgr = lotus.modelMgr;
var builderMgr = lotus.builderMgr;
var ViewControllerBuilder = builderMgr.queryViewControllerBuilder();


var ListViewControllerBuilder = function() {
    ViewControllerBuilder.call(this);
}

util.inherits(ListViewControllerBuilder, ViewControllerBuilder);

ListViewControllerBuilder.prototype.parse = function(model) {
    if(util.isNullOrUndefined(model.bind)) {
        model.bind = {};
    }

    model.bind[model.viewModels.master.name + '.listViewLoadingStatus'] = function() { setLoadingStatus();}

    this._buildListView(model);
    this._buildListViewAdapter(model);

    if(!this._parseInternal(model)) {
        return '';
    }

    return this._render();
}

ViewControllerBuilder.prototype._getTemplate = function() {
    return tpl.listViewController.main;
}

ListViewControllerBuilder.prototype._buildListView = function(model) {
    var listViewModel = findListViewModel(model.content);
    if(listViewModel == null) {
        throw 'there is no list view widget';
    }

    this._codeMemberVariable += codeGenerateUtil.generateMemberVariable('PullToRefreshListView', listViewModel.id) + '\r';
    this._codeMemberVariable += codeGenerateUtil.generateMemberVariable('BaseAdapter', 'adapter');

    this._codeOnCreateView += mustache.render(tpl.listViewController.onCreateView, {
        listViewObjName: listViewModel.id,
        className: model.name
    })

    var viewModelOriginal = modelMgr.queryViewModel(model.viewModels.master.type);
    var modelName = viewModelOriginal.list.modelType

    this._codeEventImpl += mustache.render(tpl.listViewController.event, {
        viewModelObjName: model.viewModels.master.name,
        viewModelClassName: model.viewModels.master.type,
        modelClassName: modelName,
        listViewObjName: listViewModel.id
    })

    this._buildListViewImport();
    this._buildListViewDestroy();
}

ListViewControllerBuilder.prototype._buildListViewDestroy = function() {
    this._codeOnDestroy += 'adapter = null;';
}

ListViewControllerBuilder.prototype._buildListViewImport = function() {
    this._importRecorder.addPlain('com.handmark.pulltorefresh.library.PullToRefreshBase');
    this._importRecorder.addPlain('com.handmark.pulltorefresh.library.PullToRefreshListView');
    this._importRecorder.addPlain('android.widget.AbsListView');
    this._importRecorder.addPlain('android.widget.BaseAdapter');
}

ListViewControllerBuilder.prototype._buildListViewAdapter = function(model) {
    var listViewModel = findListViewModel(model.content);
    var ListViewAdapterBuilder = require('./listViewAdapterBuilder');
    var listViewAdapterBuilder = new ListViewAdapterBuilder();

    var codeRecorder = listViewAdapterBuilder.parse(listViewModel, model);
    this._codeEventImpl += codeRecorder.getEventImpl();
    this._importRecorder.addAll(codeRecorder.getImportRecorder());
}

var findListViewModel = function(model) {
    if(model.type == 'XListView') {
        return model;
    }

    if(util.isNullOrUndefined(model.units)) {
        return null;
    }

    for(var k in model.units) {
        var m = model.units[k];
        var ret = findListViewModel(m);
        if(ret != null) {
            return ret;
        }
    }
    return null;
}

module.exports = ListViewControllerBuilder;