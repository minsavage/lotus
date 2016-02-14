/**
 * Created by danney on 16/2/1.
 */
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var stringUtil = lotus.util.stringUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var modelMgr = lotus.modelMgr;
var builderMgr = lotus.builderMgr;
var ImportReorder = lotus.recorder.ImportRecorder;
var CodeRecorder = lotus.recorder.CodeRecorder;

var ListViewAdapterBuilder = function() {
    this._codeInit = '';
    this._codeEvent = '';
    this._codeAssignment = '';
    this._codeDeclare = '';
    this._importReorder = new ImportReorder();
}

ListViewAdapterBuilder.prototype.parse = function(listViewModel, hostViewControllerModel) {
    var adapter = listViewModel.adapter;
    var itemViewController = modelMgr.queryViewController(adapter.listItem);

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
        layoutId: lotus.util.nameUtil.vcToXmlFileName(itemViewController.name),
        modelClassName: itemModelClassName,
        modelObjName: itemModelObjName,
        viewHolder: this._codeDeclare
    });

    this._importReorder.addModel(itemModelClassName);
    this._importReorder.addPlain('java.lang.ref.WeakReference');


    var codeRecorder = new CodeRecorder();
    codeRecorder.getImportRecorder().addAll(this._importReorder);
    codeRecorder.addEventImpl(code)
    return codeRecorder;
}

ListViewAdapterBuilder.prototype._buildWidget = function(model) {
    var codeRecorder = buildWidget(model);
    if(codeRecorder != null) {
        this._codeDeclare += codeRecorder.getMemberVariable() + '\r';
        this._codeInit += codeRecorder.getOnCreateView(); + '\r'
        this._codeEvent = codeRecorder.getEventImpl() + '\r\r';
        this._codeAssignment += codeRecorder.getAssignment() + '\r';
        this._importReorder.addAll(codeRecorder.getImportRecorder());
    }

    var units = model['units'];
    if(units != null) {
        for(var key in units) {
            this._buildWidget(units[key]);
        }
    }
}

ListViewAdapterBuilder.prototype._buildImport = function(model) {
    this._importReorder.addPlain('java.lang.ref.WeakReference');
}

var buildWidget = function(model) {
    var Builder = builderMgr.queryWidgetBuilder(model.type);
    var config = builderMgr.queryWidgetBuildConfig(model.type);
    var strTpl = 'viewHolder.{{id}}.setTag(ref);';

    var codeRecorder = null;
    if(Builder != null) {
        var builder = new Builder();
        builder.setBuildAdapterMode();
        codeRecorder = builder.parse(model, config);
        if(codeRecorder != null) {
            var setTag = strTpl.replace('{{id}}', model.id);
            codeRecorder.addOnCreateView(setTag);
        }
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