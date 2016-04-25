/**
 * Created by danney on 16/2/5.
 */
var fs = require('fs');
var fsUtil = require('fs-extra');
var mustache = require('mustache');
var lotus = require('../../lotus');
var path = require('path');
var projectConfig = lotus.projectConfig;

var ProjectInitializer = function() {

}

ProjectInitializer.prototype.init = function() {
    try {
        var srcDir = path.resolve(__dirname, '../../../res/android/project' );
        var destDir = path.resolve(projectConfig.getOutputDir(), projectConfig.get('productName'));
        fsUtil.copySync(srcDir, destDir);
    } catch (err) {
        console.error('Oh no, there was an error: ' + err.message)
    }

    this.copyBase();
}

ProjectInitializer.prototype.copyBase = function() {
    var baseDir = path.resolve(__dirname, '../../../res/android/base' );
    var destDir = path.resolve(projectConfig.getSrcDir(), 'base');
    fsUtil.ensureDirSync(destDir);

    var contentList = fs.readdirSync(baseDir);
    for(var k in contentList) {
        var item = contentList[k];
        if(path.extname(item) != '.java') {
            continue;
        }

        var srcFilePath = path.resolve(baseDir, item);
        var content = fs.readFileSync(srcFilePath, 'utf-8');
        var ret = mustache.render(content, {packageName: projectConfig.getPackageName});
        var filePath = path.resolve(destDir, item);
        fs.writeFileSync(filePath, ret);
    }
}

module.exports = ProjectInitializer;