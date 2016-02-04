/**
 * Created by danney on 16/2/1.
 */
var mustache = require('mustache');
var tpl = require('../../template')('./template');
var modelDataMgr = require('../../modelDataMgr');
var widgetMgr = require('../../widgetMgr');
var stringUtil = require('../../util/stringUtil');
var codeGenerateUtil = require('../../util/codeGenerateUtil');
var AdapterWidgetBuilder = require('./adapterWidgetBuilder');
var ImportGenerator = require('../../util/importGenerator');
var CodeGenerateRecorder = require('../CodeGenerateRecorder');


var ListViewAdapterBuilder = function() {
    this._codeInit = '';
    this._codeEvent = '';
    this._codeAssignment = '';
    this._codeDeclare = '';
    this._importGenerator = new ImportGenerator();
}

ListViewAdapterBuilder.prototype.parse = function(listViewModel, hostViewControllerModel) {
    var adapter = listViewModel.adapter;
    var itemViewController = modelDataMgr.queryViewController(adapter.listItem);

    this._buildWidget(itemViewController.content);

    var className = hostViewControllerModel.name + 'Adapter';
    var listDataGetter = getListDataGetter(adapter.listData);
    var itemModelClassName = itemViewController.viewModel.type;
    var itemModelObjName = itemViewController.viewModel.name;

    var code = mustache.render(tpl.listViewAdapter.main, {
        className: className,
        listDataGetter: listDataGetter,
        assignment: this._codeAssignment,
        init: this._codeInit,
        event: this._codeEvent,
        layoutId: stringUtil.vcToXmlFileName(itemViewController.name),
        modelClassName: itemModelClassName,
        modelObjName: itemModelObjName,
        viewHolder: this._codeDeclare
    });

    this._importGenerator.addModel(itemModelClassName);
    this._importGenerator.addPlain('java.lang.ref.WeakReference');


    var codeGenerateRecorder = new CodeGenerateRecorder();
    codeGenerateRecorder._importGenerator.addAll(this._importGenerator);
    codeGenerateRecorder.addEventImpl(code)
    return codeGenerateRecorder;
}

ListViewAdapterBuilder.prototype._buildWidget = function(model) {
    var codeRecorder = buildWidget(model);
    if(codeRecorder != null) {
        this._codeDeclare += codeRecorder.getMemberVariable() + '\r';
        this._codeInit += codeRecorder.getOnCreateView(); + '\r'
        this._codeEvent = codeRecorder.getEventImpl() + '\r\r';
        this._codeAssignment += codeRecorder.getOnCreate() + '\r';
        this._importGenerator.addAll(codeRecorder.getImportGenerator());
    }

    var units = model['units'];
    if(units != null) {
        for(var key in units) {
            this._buildWidget(units[key]);
        }
    }
}

ListViewAdapterBuilder.prototype._buildImport = function(model) {
    this._importGenerator.addPlain('java.lang.ref.WeakReference');

}

var buildWidget = function(model) {
    var Builder = AdapterWidgetBuilder;
    var config = widgetMgr.queryCodeBuildConfig(model.type);

    var codeRecorder = null;
    if(Builder != null && config != null) {
        var builder = new Builder();
        codeRecorder = builder.parse(model, config);
    }

    return codeRecorder;
}

var getListDataGetter = function(str) {
    var data = str.substring(2, str.length-1);
    var array = data.split('.');
    var obj = array[0];
    var property = array[1];
    var listDataGetter = codeGenerateUtil.generateGetterCall(obj, property);
    return listDataGetter.substr(0, listDataGetter.length-1);
}

module.exports = ListViewAdapterBuilder;