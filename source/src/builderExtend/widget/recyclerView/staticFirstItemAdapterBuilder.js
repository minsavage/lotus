/**
 * Created by zouqin on 16/5/10.
 */
'use strict';
var util = require('util');
var lotus = require('../../../lotus')
var path = require('path');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var mustache = require('mustache');
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var stringUtil = lotus.util.stringUtil;

class StaticFirstItemAdapterBuilder {
    parse(model) {
        var adapterClassName = 'RecyclerViewAdapter';
        var item = model.adapter.item;
        var dataSource = model.adapter.dataSource;
        var viewHolderClassName = stringUtil.withoutSuffix(item, 'ViewController') + 'ViewHolder';

        var staticFirstItem = model.adapter.staticFirstItem;
        if(!stringUtil.isNotEmpty(staticFirstItem)) {
            throw 'can not found static first item'
        }

        var staticViewHolderClassName = stringUtil.withoutSuffix(staticFirstItem, 'ViewController') + 'ViewHolder';

        var code = mustache.render(tpl.staticFirstItemAdapter, {
            adapterClassName: adapterClassName,
            viewHolderClassName: viewHolderClassName,
            dataSource: getListDataGetter(dataSource),
            staticViewHolderClassName: staticViewHolderClassName,
            staticFirstItem: staticFirstItem,
            staticFirstItemObj: stringUtil.firstCharacterToLowercase(staticFirstItem)
        });
        return code;
    }
}

var getListDataGetter = function(str) {
    var reg = /^@{(\w+)\.(\w+)}$/g;
    if(!reg.test(str)) {
        throw 'error syntax: '+ str;
    }

    var obj = RegExp.$1;
    var property = RegExp.$2;
    return codeGenerateUtil.generateGetterCall(obj, property);
}

module.exports = StaticFirstItemAdapterBuilder;