/**
 * Created by danney on 16/1/26.
 */
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var nameUtil = lotus.util.nameUtil;
var stringUtil = lotus.util.stringUtil;

var PageBuilder = function() {}

PageBuilder.prototype.parse = function(model) {
    return mustache.render(tpl.page.main, {
        className: nameUtil.pageToActivityName(model.name),
        viewControllerClass: model.content,
        viewControllerObj: stringUtil.firstCharacterToLowercase(model.content),
        packageName: lotus.projectConfig.getPackageName()
    })
}

module.exports = PageBuilder;