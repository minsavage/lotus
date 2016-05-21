/**
 * Created by danney on 16/5/3.
 */
'use strict';
var util = require('util');
var lotus = require('../../../lotus')
var path = require('path');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var mustache = require('mustache');
var codeGenerateUtil = lotus.util.codeGenerateUtil;

var dataBindingUtil = lotus.util.dataBindingUtil;
var esprima = require('esprima');
var CodeTranslator = require('../../../builder/function/CodeTranslator');

var WidgetBuilder = lotus.builderMgr.queryWidgetBuilder();

class RecyclerViewBuilder extends WidgetBuilder {
    constructor() {
        super();
        this.adapterClassName = 'RecyclerViewAdapter';
        this.adapterObjName = 'recyclerViewAdapter';
    }

    parse(model, buildConfig) {
        var ret = super.parse(model, buildConfig);
        if(util.isNullOrUndefined(ret)) {
            console.log('parsing... null');
            return null;
        }

        this._buildAdapter();
        this._buildViewHolder();
        return this.codeRecorder;
    }

    _buildMemberVariable() {
        super._buildMemberVariable();
        var code = codeGenerateUtil.generateMemberVariable(this.adapterClassName, this.adapterObjName);
        this.codeRecorder.addMemberVariable(code);
    }

    _buildOnCreateView() {
        super._buildOnCreateView();
        var code = mustache.render(tpl.init, {objName: this.model.id})
        this.codeRecorder.addOnCreateView(code);
    }

    _buildOnDestroy() {
        super._buildOnDestroy();
        var code = 'recyclerViewAdapter = null;\r';
        this.codeRecorder.addOnDestroy(code);
    }

    _buildAdapter() {
        var SingleItemAdapterBuilder = require('./singleItemAdapterBuilder');
        var builder = new SingleItemAdapterBuilder();
        var code = builder.parse(this.model);
        this.codeRecorder.addEventImpl(code);
    }

    _buildViewHolder() {
        var ViewHolderBuilder = require('./viewHolderBuilder');
        var builder = new ViewHolderBuilder();
        var result = builder.parse(this.model);
        this.codeRecorder.addEventImpl(result.code);
        this.codeRecorder.addImport(result.import);
    }

    canParse() {
        return true;
    }
}

module.exports = RecyclerViewBuilder;
//
// var config = {
//     content: {
//         type: 'RelativeLayout',
//         id: '...',
//         layout: 'matach_parent',
//         units: [{
//             type: 'RecyclerView',
//             id: 'myRecyclverView',
//             adapter: {
//                 listItem: 'WeiboItemViewController',
//                 listData: '@{weibosVM.weibos}'
//             },
//         }]
//     }
// }