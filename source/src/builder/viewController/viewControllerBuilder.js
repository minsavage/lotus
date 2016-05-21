/**
 * Created by danney on 15/11/22.
 */
'use strict';
var util = require('util');
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var stringUtil = lotus.util.stringUtil;
var nameUtil = lotus.util.nameUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var objectUtil = lotus.util.objectUtil;
var projectConfig = lotus.projectConfig;
var modelMgr = lotus.modelMgr;
var builderMgr = lotus.builderMgr;
var FunctionBuilder = require('../function/functionBuilder');
var BaseBuilder = require('../baseBuilder');

class ViewControllerBuilder extends BaseBuilder {
    constructor() {
        super();
        this._model = null;
        this._codeMemberVariable = '';
        this._codeOnCreate = '';
        this._codeOnCreateView = '';
        this._codeEventImpl = '';
        this._codeOnDestroy = "";
        this._dataBinding = {};
    }

    parse(model) {
        if(this._parseInternal(model)) {
            return this._render();
        }
        else {
            return '';
        }
    }

    _parseInternal(model) {
        if(!util.isNullOrUndefined(model.config)) {
            if(model.config.layoutOnly == true) {
                return false;
            }
        }

        var v = model['viewModels']
        if(v == null) {
            throw 'no "viewModels" field';
        }

        this._model = model;
        this.importRecorder.add(model.import);

        this._buildViewModel(model);
        this._buildUIControl(model.content);
        this._buildDataBinding(model);
        this._buildEvent(model);

        return true;
    }

    _render() {
        var result = mustache.render(this._getTemplate(), this._getRenderData());
        result = onBuildFinished(result);
        return result;
    }

    _getTemplate() {
        return tpl.viewController.main;
    }

    _getRenderData() {
        var data = {
            packageName: projectConfig.getPackageName(),
            import: this.importRecorder.generate(),
            className: this._model.name,
            variableStmt: this._codeMemberVariable,
            layoutFileName: nameUtil.vcToXmlFileName(this._model.name),
            onCreate: this._codeOnCreate.trim(),
            onCreateView: this._codeOnCreateView.trim(),
            viewModelDestroy: this._codeOnDestroy.trim(),
            viewModelObserverStmt: this._codeEventImpl.trim(),
            dataBindingName : nameUtil.vcToBindingName(this._model.name),
            viewModelObjName: this._model.viewModels.master.name,
            viewModelObjNameWithFirstUppercase: stringUtil.firstCharacterToUppercase(this._model.viewModels.master.name)
        }
        return data;
    }

    _buildViewModel(model) {
        var master = model.viewModels.master;
        var slaves = model.viewModels.slave;

        //变量申明
        this._codeMemberVariable += codeGenerateUtil.generateMemberVariable(master.type, master.name) + '\r';
        for(var k in slaves) {
            var vm = slaves[k];
            this._codeMemberVariable += codeGenerateUtil.generateMemberVariable(vm.type, vm.name) + '\r';
        }

        //初始化
        var init = mustache.render(tpl.viewController.viewModelInit, {
                viewModelClassName: master.type,
                viewModelObjName: master.name
            }) + '\r';

        for(var k in slaves) {
            var vm = slaves[k];
            init += mustache.render(tpl.viewController.viewModelInitGet, {
                    viewModelClassName: vm.type,
                    viewModelObjName: vm.name}) + '\r';
        }

        if(util.isFunction(model.viewModels.init)) {
            var builder = new FunctionBuilder();
            var codeRecorder = builder.parse(model.viewModels.init);
            init += codeRecorder.getOnCreate();
        }

        this._codeOnCreate += init;

        //销毁
        var destroy = mustache.render(tpl.viewController.viewModelDestroy, {
                viewModelClassName: master.type,
                viewModelObjName: master.name
            }) + '\r';
        for(var k in slaves) {
            var vm = slaves[k];
            destroy +=  vm.name + ' = null;\r';
        }

        this._codeOnDestroy += destroy;
    }

    _buildDataBinding(model) {
        var bind = model.bind;
        for(var k in bind) {
            var property = k.split('.')[1];

            var builder = new FunctionBuilder();
            var codeRecorder = builder.parse(bind[k]);
            var code = codeRecorder.getOnCreate();
            this.importRecorder.add(codeRecorder.getImportRecorder());

            if(util.isNullOrUndefined(this._dataBinding[property])) {
                this._dataBinding[property] = '';
            }

            this._dataBinding[property] += code;
        }

        var ids = [];
        var values = [];

        for(var k in this._dataBinding) {
            ids.push('BR.' + k);
            values.push(this._dataBinding[k]);
        }

        var content = codeGenerateUtil.generateSwitchCase('propertyId', ids, values);

        var result = mustache.render(tpl.viewController.viewModelObserverStmt, {
            viewModelObjName: model.viewModels.master.name,
            content: content
        });

        var init = mustache.render(tpl.viewController.viewModelAddCallback, {
            viewModelObjName: model.viewModels.master.name
        });

        this._codeEventImpl += result + '\r\r';
        this._codeOnCreate += init + '\r';
    }

    _buildUIControl(model) {
        var codeRecorder = buildWidget(model);
        if(codeRecorder != null) {
            this._codeMemberVariable += codeRecorder.getMemberVariable().trim();
            this._codeOnCreate += codeRecorder.getOnCreate().trim();
            this._codeOnCreateView += codeRecorder.getOnCreateView().trim();
            this._codeOnDestroy += codeRecorder.getOnDestroy().trim();
            this._codeEventImpl += codeRecorder.getEventImpl().trim();
            this.importRecorder.add(codeRecorder.getImportRecorder());

            var dataBinding = codeRecorder.getDataBinding();
            for(var k in dataBinding) {
                if(util.isString(this._dataBinding[k])) {
                    this._dataBinding[k] += dataBinding[k];
                }
                else {
                    this._dataBinding[k] = dataBinding[k];
                }
            }
        }

        var units = model['units'];
        if(units != null) {
            for(var key in units) {
                this._buildUIControl(units[key]);
            }
        }
    }

    _buildEvent(model) {
        if(util.isNullOrUndefined(model.event)) {
            return;
        }

        var events = ['onCreate', 'onCreateView', 'onStart', 'onResume', 'onPaused', 'onStop', 'onDestroy', 'onDestroyView'];
        for(var k in events) {
            var name = events[k];
            var eventFunc = model.event[name];
            if(util.isFunction(eventFunc)) {
                var builder = new FunctionBuilder();
                var codeRecorder = builder.parse(eventFunc);
                this.importRecorder.add(codeRecorder.import);
                var content = codeRecorder.code;

                if(name == 'onCreate') {
                    this._codeOnCreate += content;
                }
                else if(name == 'onCreateView') {
                    this._codeOnCreateView += content;
                }
                else if(name == 'onDestroy') {
                    this._codeOnDestroy += content;
                }
                else {
                    var code = mustache.render(tpl.viewController.event, {
                        eventName: name,
                        content: content
                    });

                    this._codeEventImpl += code;
                }
            }
        }
    }
}


var buildWidget = function(model) {
    var Builder = builderMgr.queryWidgetBuilder(model.type);
    var config = builderMgr.queryWidgetBuildConfig(model.type);

    var codeRecorder = null;
    if(Builder != null) {
        var builder = new Builder();
        codeRecorder = builder.parse(model, config);
    }

    return codeRecorder;
}

var onBuildFinished = function(result) {
    var index = result.indexOf('SimpleDraweeView');
    if(index == -1) {
        return result;
    }

    var tpl = 'super.onCreate(savedInstanceState);'
    index = result.indexOf(tpl);
    if(index == -1) {
        return result;
    }

    var code = '\rFresco.initialize(getContext());\r';
    var point = index + tpl.length;
    return result.substring(0, point) + code + result.substring(point);
}

module.exports = ViewControllerBuilder;