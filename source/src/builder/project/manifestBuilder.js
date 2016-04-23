/**
 * Created by danney on 16/2/5.
 */
var util = require('util');
var path = require('path');
var mustache = require('mustache');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var projectConfig = lotus.projectConfig;
var modelMgr = lotus.modelMgr;
var codeGenerateUtil = lotus.util.codeGenerateUtil;

var ManifestBuilder = function() {

}

ManifestBuilder.prototype.parse = function() {
    var pages = modelMgr.getPages();
    var activities = '';
    for(var k in pages) {
        var page = pages[k];
        var name = '.activity.' + lotus.util.nameUtil.pageToActivityName(page.name);
        var isEntry = (page.name == projectConfig.get('entryPage')) ? true: false;
        activities += codeGenerateUtil.generateActivityInManifest(name, isEntry);
    }

    return mustache.render(tpl.manifest, {
        packageName: projectConfig.getPackageName(),
        activities: activities
    })
}

module.exports = ManifestBuilder;