/**
 * Created by danney on 15/11/22.
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


var ViewControllerBuilder = function() {
    this._model = null;
    this._codeMemberVariable = '';
    this._codeOnCreate = '';
    this._codeOnCreateView = '';
    this._codeEventImpl = '';
    this._codeOnDestroy = "";
    this._dataBinding = {};
    this._importGenerator = new ImportGenerator();
}

ViewControllerBuilder.prototype.parse = function(model) {
    if(this._parseInternal(model)) {
        return this._render();
    }
    else {
        return '';
    }
}

ViewControllerBuilder.prototype._parseInternal = function(model) {
    if(!util.isNullOrUndefined(model.config)) {
        if(model.config.layoutOnly == true) {
            return false;
        }
    }

    var v = model['viewModel']
    if(v == null) {
        throw 'no "viewModel" field';
    }

    this._model = model;
    this._buildViewModel(model);
    this._buildUIControl(model.content);
    this._buildDataBinding(model);

    return true;
}

ViewControllerBuilder.prototype._render = function() {
    return mustache.render(this._getTemplate(), this._getRenderData());

    //return mustache.render(tpl.viewController.main, {
    //    packageName: globalConfig.packageName,
    //    import: this._importGenerator.generate(),
    //    className: this._model.name,
    //    variableStmt: this._codeMemberVariable,
    //    layoutFileName: stringUtil.vcToXmlFileName(this._model.name),
    //    onCreate: this._codeOnCreate.trim(),
    //    onCreateView: this._codeOnCreateView.trim(),
    //    viewModelDestroy: this._codeOnDestroy.trim(),
    //    viewModelObserverStmt: this._codeEventImpl.trim(),
    //    dataBindingName : stringUtil.vcToBindingName(this._model.name),
    //    viewModelObjName: this._model.viewModel.name,
    //    viewModelObjNameWithFirstUppercase: stringUtil.firstCharacterToUppercase(this._model.viewModel.name)
    //})
}

ViewControllerBuilder.prototype._getTemplate = function() {
    return tpl.viewController.main;
}

ViewControllerBuilder.prototype._getRenderData = function() {
    var data = {
        packageName: globalConfig.packageName,
        import: this._importGenerator.generate(),
        className: this._model.name,
        variableStmt: this._codeMemberVariable,
        layoutFileName: stringUtil.vcToXmlFileName(this._model.name),
        onCreate: this._codeOnCreate.trim(),
        onCreateView: this._codeOnCreateView.trim(),
        viewModelDestroy: this._codeOnDestroy.trim(),
        viewModelObserverStmt: this._codeEventImpl.trim(),
        dataBindingName : stringUtil.vcToBindingName(this._model.name),
        viewModelObjName: this._model.viewModel.name,
        viewModelObjNameWithFirstUppercase: stringUtil.firstCharacterToUppercase(this._model.viewModel.name)
    }
    return data;
}

ViewControllerBuilder.prototype._buildViewModel = function(model) {
    var viewModel = model.viewModel;
    var className = viewModel.type;
    var objName = viewModel.name;

    //变量申明
    this._codeMemberVariable += codeGenerateUtil.generateMemberVariable(className, objName) + '\r';

    //初始化
    var init = mustache.render(tpl.viewController.viewModelInit, {
        viewModelClassName: className,
        viewModelObjName: objName
    }) + '\r';

    //检测是否需要注册ViewModelPropertyChanged监听
    if(!util.isNullOrUndefined(model.bind) && objectUtil.getSize(model.bind) > 0) {
        init += mustache.render(tpl.viewController.viewModelAddCallback, {
            viewModelObjName: objName
        });
    }

    this._codeOnCreate += init + '\r';

    //销毁
    var destroy = mustache.render(tpl.viewController.viewModelDestroy, {
        viewModelClassName: className,
        viewModelObjName: objName
    });

    this._codeOnDestroy += destroy + '\r';


    ////注册监听
    //var observer = mustache.render(tpl.viewController.viewModelObserverStmt, {
    //    viewModelClassName: className,
    //    viewModelObjName: objName
    //});

    this._importGenerator.addViewModel(className);

    //this._codeEventImpl += observer + '\r\r';
}

ViewControllerBuilder.prototype._buildDataBinding = function(model) {
    if(!util.isNullOrUndefined(model.bind)) {
        for(var property in model.bind) {
            var action = model.bind[property]
            if(util.isNullOrUndefined(this._dataBinding[property])) {
                this._dataBinding[property] = [];
            }

            this._dataBinding[property].push(action);
        }
    }

    if (objectUtil.getSize(this._dataBinding) == 0) {
        return;
    }

    var ids = [];
    var values = [];
    for(var property in this._dataBinding) {
        var propertyStr = 'BR.' + property.split('.')[1];
        ids.push(propertyStr);
        var actions = this._dataBinding[property];
        var value = '';
        for(var k in actions) {
            value += actionTranslateUtil.translate(actions[k]) + '\r';
        }
        values.push(value);
    }
    var content = codeGenerateUtil.generateSwitchCase('propertyId', ids, values);

    var result = mustache.render(tpl.viewController.viewModelObserverStmt, {
        viewModelObjName: model.viewModel.name,
        content: content
    });

    this._codeEventImpl += result + '\r\r';
}

ViewControllerBuilder.prototype._buildUIControl = function(model) {
    var codeRecorder = buildWidget(model);
    if(codeRecorder != null) {
        this._codeMemberVariable += codeRecorder.getMemberVariable() + '\r';
        this._codeOnCreate += codeRecorder.getOnCreate() + '\r';
        this._codeOnCreateView += codeRecorder.getOnCreateView() + '\r';
        this._codeOnDestroy += codeRecorder.getOnDestroy() + '\r';
        this._codeEventImpl += codeRecorder.getEventImpl() + '\r\r';
        this._importGenerator.addAll(codeRecorder.getImportGenerator());
    }

    var units = model['units'];
    if(units != null) {
        for(var key in units) {
            this._buildUIControl(units[key]);
        }
    }
}

var buildWidget = function(model) {
    var Builder = widgetMgr.queryCodeBuilder(model.type);
    var config = widgetMgr.queryCodeBuildConfig(model.type);

    var codeRecorder = null;
    if(Builder != null) {
        var builder = new Builder();
        codeRecorder = builder.parse(model, config);
    }

    return codeRecorder;
}


module.exports = ViewControllerBuilder;