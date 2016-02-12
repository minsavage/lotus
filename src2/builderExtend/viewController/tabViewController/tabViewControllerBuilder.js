/**
 * Created by danney on 16/2/2.
 */
var util = require('util');
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var stringUtil = lotus.util.stringUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var projectConfig = lotus.projectConfig;
var modelMgr = lotus.modelMgr;
var builderMgr = lotus.builderMgr;
var ViewControllerBuilder = builderMgr.queryViewControllerBuilder();

var TabViewController = function() {
    ViewControllerBuilder.call(this);

    this._tabContainer = null;
    this._tabBar = null;
    this._tabButtons = [];
    this._tabContents = [];

    this._codeGetTabViewController = '';
    this._codeGetButton = '';
}

util.inherits(TabViewController, ViewControllerBuilder);

TabViewController.prototype.parse = function(model) {
    if(!this._parseInternal(model)) {
        return '';
    }

    this._findTab(model.content);
    this._buildTabMemberVariable();
    this._buildTabOnCreateView();
    this._buildTabOnDestroy();
    this._buildGetTabViewController();
    this._buildGetButton();

    return this._render();
}

TabViewController.prototype._render = function() {
    var data = this._getRenderData();
    data['tabContainerName'] = this._tabContainer.id;
    data['tabCount'] = this._tabButtons.length;
    data['getTabViewController'] = this._codeGetTabViewController;
    data['getButton'] = this._codeGetButton;

    return mustache.render(tpl.tabViewController.main, data);
}


TabViewController.prototype._buildTabMemberVariable = function() {
    var variable = '';
    variable += codeGenerateUtil.generateMemberVariable('ViewPager', this._tabContainer.id) + '\r';
    variable += codeGenerateUtil.generateMemberVariable('RadioGroup', this._tabBar.id) + '\r';
    for(var k in this._tabButtons) {
        var tabBtn = this._tabButtons[k];
        variable += codeGenerateUtil.generateMemberVariable('RadioButton', tabBtn.id) + '\r';
    }
    for(var k in this._tabContents) {
        var tabContent = this._tabContents[k];
        variable += codeGenerateUtil.generateMemberVariable(tabContent, stringUtil.firstCharacterToLowercase(tabContent)) + '\r';
    }

    this._codeMemberVariable += variable;
}

TabViewController.prototype._buildTabOnCreateView = function() {
    var code = mustache.render(tpl.tabViewController.onCreateView, {
        tabContainer: this._tabContainer.id,
        tabBar: this._tabBar.id
    });

    for(var k in this._tabButtons) {
        var tabBtn = this._tabButtons[k];
        code += codeGenerateUtil.generateFindViewById('RadioButton', tabBtn.id, 'view', tabBtn.id) + '\r';
    }

    for(var k in this._tabButtons) {
        var tabBtn = this._tabButtons[k];
        code += mustache.render(tpl.tabViewController.setTag, {
            name: tabBtn.id,
            index: k
        }) + '\r';
    }

    this._codeOnCreateView += code;
}

TabViewController.prototype._buildTabOnDestroy = function() {
    var code = '';
    code += this._tabContainer.id + ' = null;'
    code += this._tabBar.id + ' = null;'
    for(var k in this._tabButtons) {
        var tabBtn = this._tabButtons[k];
        code += tabBtn.id + ' = null;'
    }
    this._codeOnDestroy += code;
}

TabViewController.prototype._buildGetTabViewController = function() {
    var ids = [];
    var values = [];

    for(var k in this._tabContents) {
        var content = this._tabContents[k];

        var code = mustache.render(tpl.tabViewController.initViewController, {
            viewControllerObjName: stringUtil.firstCharacterToLowercase(content),
            viewControllerClassName: content
        });

        ids.push(k);
        values.push(code);
    }

    this._codeGetTabViewController = codeGenerateUtil.generateSwitchCase('position', ids, values);
}

TabViewController.prototype._buildGetButton = function() {
    var ids = [];
    var values = [];

    for(var k in this._tabContents) {
        var tabBtn = this._tabButtons[k];
        var code = '_btn = ' + tabBtn.id + ';';
        ids.push(k);
        values.push(code);
    }

    this._codeGetButton = codeGenerateUtil.generateSwitchCase('position', ids, values);

}

TabViewController.prototype._findTab = function(model) {
    if(model.type == 'TabContainer') {
        this._tabContainer = model;
    }
    else if(model.type == 'TabBar') {
        this._tabBar = model;
    }
    else if(model.type == 'TabButton') {
        this._tabButtons.push(model);
        this._tabContents.push(model.content);
    }

    if(!util.isNullOrUndefined(model.units)) {
        for(var k in model.units) {
            this._findTab(model.units[k]);
        }
    }
}

module.exports = TabViewController;