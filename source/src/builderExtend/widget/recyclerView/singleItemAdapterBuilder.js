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

class SingleItemAdapterBuilder {
    parse(model) {
        var adapterClassName = 'RecyclerViewAdapter';
        var item = model.adapter.item;
        var dataSource = model.adapter.dataSource;
        var viewHolderClassName = stringUtil.withoutSuffix(item, 'ViewController') + 'ViewHolder';

        var code = mustache.render(tpl.singleViewHolderAdapter, {
            adapterClassName: adapterClassName,
            viewHolderClassName: viewHolderClassName,
            dataSource: getListDataGetter(dataSource)
        });
        return code;
    }
}

var getListDataGetter = function(str) {
    var data = str.substring(2, str.length-1);
    var array = data.split('.');
    var obj = array[0];
    var property = array[1];
    var listDataGetter = codeGenerateUtil.generateGetterCall(obj, property);
    return listDataGetter.substr(0, listDataGetter.length-1);
}

module.exports = SingleItemAdapterBuilder;