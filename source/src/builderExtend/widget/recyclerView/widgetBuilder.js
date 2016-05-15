/**
 * Created by danney on 16/5/3.
 */

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
        if(util.isNullOrUndefined(super.parse(model, buildConfig))) {
            console.log('parsing... null');
            return null;
        }

        this._buildAdapter();
        this._buildViewHolder();
        return this.codeRecorder;
    }

    _buildMemberVariable() {
        console.log('parsing... member');
        super._buildMemberVariable();
        var code = codeGenerateUtil.generateVariableDeclare(this.adapterClassName, this.adapterObjName);
        console.log(code);
        this.codeRecorder.addMemberVariable(code);
    }

    _buildOnCreateView() {
        super._buildOnCreateView();
        var code = mustache.render(tpl.init, {objName: this.model.id})
        this.codeRecorder.addOnCreateView(code);
    }

    _buildOnDestroy() {
        super._buildOnDestroy();
        var code = 'recyclerViewAdapter = null;';
        this.codeRecorder.addOnDestroy(code);
    }

    _buildAdapter() {
        var SingleItemAdapterBuilder = require('./singleItemAdapterBuilder');
        var builder = new SingleItemAdapterBuilder();
        var code = builder.parse(this.model);
        console.log(code);
        this.codeRecorder.addEventImpl(code);
    }

    _buildViewHolder() {

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