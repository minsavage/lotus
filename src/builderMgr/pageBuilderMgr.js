/**
 * Created by danney on 16/1/15.
 */
var fs = require('fs');
var globalConfig = require('../globalConfig');
var PageBuilder = require('../builder/PageBuilder');
var nameUtil = require('../util/nameUtil');

var build = function(models) {
    for(var k in models) {
        var model = models[k];

        var pageBuilder = new PageBuilder();
        var ret = pageBuilder.parse(model);

        var dirPath = globalConfig.outputPath + '/activity/';
        if(!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        var fileName = nameUtil.getPageName(model.name)
        var filePath = dirPath + fileName + '.java';
        fs.writeFileSync(filePath, ret);
    }
}

exports.build = build;