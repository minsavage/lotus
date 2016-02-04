/**
 * Created by danney on 16/2/1.
 */
var util = require('util');
var mustache = require('mustache');
var tpl = require('../template')('./template');
var globalConfig = require('../globalConfig');
var modelDataMgr = require('../modelDataMgr');
var ImportGenerator = require('../util/importGenerator');
var widgetMgr = require('../widgetMgr');
var codeGenerateUtil = require('../util/codeGenerateUtil');
var stringUtil = require('../util/stringUtil');
var objectUtil = require('../util/objectUtil');
var actionTranslateUtil = require('../util/actionTranslateUtil.js');
var modelDataMgr = require('../modelDataMgr');
var ViewControllerBuilder = require('./ViewControllerBuilder');

var ListViewControllerBuilder = function() {
    ViewControllerBuilder.call(this);
}

util.inherits(ListViewControllerBuilder, ViewControllerBuilder);

ListViewControllerBuilder.prototype.parse = function(model) {
    if(util.isNullOrUndefined(model.bind)) {
        model.bind = {};
    }
    model.bind[model.viewModel.name + '.listViewLoadingStatus'] = function() { setLoadingStatus();}

    if(!this._parseInternal(model)) {
        return '';
    }

    this._buildListView(model);
    this._buildListViewAdapter(model);

    return this._render();



    //this._buildViewModel(model);
    //this._buildUIControl(model.content);
    //this._buildDataBinding(model);
    //
    //return mustache.render(tpl.listViewController.main, {
    //    packageName: globalConfig.packageName,
    //    //import: this._codeImport,
    //    import: this._importGenerator.generate(),
    //    className: model.name,
    //    variableStmt: this._codeMemberVariable,
    //    layoutFileName: stringUtil.vcToXmlFileName(model.name),
    //    onCreate: this._codeOnCreate.trim(),
    //    onCreateView: this._codeOnCreateView.trim(),
    //    viewModelDestroy: this._codeOnDestroy,
    //    viewModelObserverStmt: this._codeEventImpl.trim(),
    //    dataBindingName : stringUtil.vcToBindingName(model.name),
    //    viewModelObjName: v.name,
    //    viewModelObjNameWithFirstUppercase: stringUtil.firstCharacterToUppercase(v.name)
    //})
}

ViewControllerBuilder.prototype._getTemplate = function() {
    return tpl.listViewController.main;
}

ListViewControllerBuilder.prototype._buildListView = function(model) {
    var listViewModel = findListViewModel(model.content);
    if(listViewModel == null) {
        throw 'there is no list view model';
    }

    this._codeMemberVariable += codeGenerateUtil.generateMemberVariable('PullToRefreshListView', listViewModel.id) + '\r';
    this._codeMemberVariable += codeGenerateUtil.generateMemberVariable('BaseAdapter', 'adapter');

    this._codeOnCreateView += mustache.render(tpl.listViewController.onCreateView, {
        listViewObjName: listViewModel.id,
        className: model.name
    })

    var viewModelOriginal = modelDataMgr.queryViewModel(model.viewModel.type);
    var modelName = viewModelOriginal.list.modelType

    this._codeEventImpl += mustache.render(tpl.listViewController.event, {
        viewModelObjName: model.viewModel.name,
        viewModelClassName: model.viewModel.type,
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
    this._importGenerator.addPlain('com.handmark.pulltorefresh.library.PullToRefreshBase');
    this._importGenerator.addPlain('com.handmark.pulltorefresh.library.PullToRefreshListView');
    this._importGenerator.addPlain('android.widget.AbsListView');
    this._importGenerator.addPlain('android.widget.BaseAdapter');
}

ListViewControllerBuilder.prototype._buildListViewAdapter = function(model) {
    var listViewModel = findListViewModel(model.content);
    var ListViewAdapterBuilder = require('./listViewAdapter/listViewAdapterBuilder');
    var listViewAdapterBuilder = new ListViewAdapterBuilder();

    var codeRecorder = listViewAdapterBuilder.parse(listViewModel, model);
    this._codeEventImpl += codeRecorder.getEventImpl();
    this._importGenerator.addAll(codeRecorder.getImportGenerator());
}

var findListViewModel = function(model) {
    if(model.type == 'XListView') {
        return model;
    }

    if(util.isNullOrUndefined(model.units)) {
        return null;
    }

    for(var k in model.units) {
        var model = model.units[k];
        var ret = findListViewModel(model);
        if(ret != null) {
            return ret;
        }
    }
    return null;
}

module.exports = ListViewControllerBuilder;