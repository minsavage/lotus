/**
 * Created by danney on 16/1/26.
 */
var tpl = require('../template')('./template');
var mustache = require('mustache');
var nameUtil = require('../util/nameUtil');
var globalConfig = require('../globalConfig');

var PageBuilder = function() {}

PageBuilder.prototype.parse = function(model) {
    return mustache.render(tpl.page.main, {
        className: nameUtil.getPageName(model.name),
        viewControllerName: model.content,
        packageName: globalConfig.packageName
    })
}

module.exports = PageBuilder;