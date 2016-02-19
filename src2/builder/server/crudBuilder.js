/**
 * Created by danney on 16/2/15.
 */
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var util = require('util');
var nameUtil = lotus.util.nameUtil;
var QueryBuilder = require('./queryBuilder');


var CRUDBuilder = function() {
    this._content = '';
    this._exports = '';

}

CRUDBuilder.prototype.parse = function(operator) {
    var actions = operator.action;

    if(!util.isNullOrUndefined(actions.query)) {
        var builder = new QueryBuilder();
        this._content += builder.parse(operator) + '\r';
        this._exports += mustache.render(tpl.crud.export, {
                functionName: nameUtil.operatorToServerFunctionName(operator, 'query')
        }) + '\r';
    }

    return mustache.render(tpl.crud.main, {
        content: this._content,
        exports: this._exports
    })
}

module.exports = CRUDBuilder;