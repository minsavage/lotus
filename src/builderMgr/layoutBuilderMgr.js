/**
 * Created by danney on 16/1/15.
 */
var fs = require('fs');
var globalConfig = require('../globalConfig');
var LayoutBuilder = require('../builder/layoutBuilder');
var stringUtil = require('../util/stringUtil');

var build = function(models) {
    for(var k in models) {
        var model = models[k];

        var layoutBuilder = new LayoutBuilder();
        var ret = layoutBuilder.parse(model);

        var dirPath = globalConfig.outputResPath;
        if(!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }


        var fileName = stringUtil.vcToXmlFileName(model.name);
        var filePath = dirPath + fileName + '.xml';
        fs.writeFileSync(filePath, ret);
    }
}

exports.build = build;