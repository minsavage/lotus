/**
 * Created by danney on 16/5/18.
 */
'use strict';
var util = require('util');
var lotus = require('../../../lotus')
var path = require('path');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var mustache = require('mustache');
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var stringUtil = lotus.util.stringUtil;
var nameUtil = lotus.util.nameUtil;
var builderMgr = lotus.builderMgr;
var modelMgr = lotus.modelMgr;
var BaseBuilder = require('../../../builder/baseBuilder');

class ViewHolderBuilder {
    constructor() {
        this._model = null;
        this._codeMemberVariable = '';
        this._codeOnCreate = '';
        this._codeOnCreateView = '';
        this._codeEventImpl = '';
        this._codeOnDestroy = "";
        this._dataBinding = {};
        this.importRecorder = new lotus.recorder.ImportRecorder();
    }

    parse(model) {
        var adapterClassName = 'RecyclerViewAdapter';
        var item = model.adapter.item;

        var viewHolderClassName = stringUtil.withoutSuffix(item, 'ViewController') + 'ViewHolder';
        var bindingClassName = nameUtil.vcToBindingName(item);

        var viewControllerModel = modelMgr.queryViewController(item);
        var vmClassName = viewControllerModel.viewModels.master.type;
        var vmObjName = viewControllerModel.viewModels.master.name;
        var setFuncName = 'set' + stringUtil.firstCharacterToUppercase(vmObjName);

        this._buildWidget(viewControllerModel.content);

        var code = mustache.render(tpl.viewHolder, {
            viewHolderClassName: viewHolderClassName,
            bindingClassName: bindingClassName,
            itemClassName: vmClassName,
            itemObjName: vmObjName,
            setFuncName: setFuncName,
            memberVariable: this._codeMemberVariable,
            init: this._codeOnCreateView,
            event: this._codeEventImpl
        });

        this.importRecorder.add('$.databinding.' + bindingClassName);
        this.importRecorder.add('java.lang.ref.WeakReference');
        this.importRecorder.add(viewControllerModel.import);

        return {
            code: code,
            import: this.importRecorder
        };
    }

    _buildWidget(model) {
        this._buildWidgetInner(model);
        if(stringUtil.isNotEmpty(this._codeOnCreateView)) {
            this._codeOnCreateView = 'View view = binding.getRoot();' + this._codeOnCreateView;
        }
    }

    _buildWidgetInner(model) {
        var codeRecorder = buildWidgetUtil(model);
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
                this._buildWidgetInner(units[key]);
            }
        }
    }
}

var buildWidgetUtil = function(model) {
    var Builder = builderMgr.queryWidgetBuilder(model.type);
    var config = builderMgr.queryWidgetBuildConfig(model.type);

    var codeRecorder = null;
    if(Builder != null) {
        var builder = new Builder();
        codeRecorder = builder.parse(model, config);
    }

    return codeRecorder;
}

module.exports = ViewHolderBuilder;