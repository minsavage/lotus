/**
 * Created by danney on 16/1/15.
 */
var fs = require('fs');
var globalConfig = require('../globalConfig');
var ModelOperatorBuilder = require('../builder/ModelOperatorBuilder');
var RemoteOperatorServiceBuilder = require('../builder/remoteOperatorServiceBuilder');
var stringUtil = require('../util/stringUtil');

var build = function(models) {
    for(var k in models) {
        var model = models[k];

        var modelOperatorBuilder = new ModelOperatorBuilder();
        var ret = modelOperatorBuilder.parse(model);

        var dirPath = globalConfig.outputPath + '/operator/';
        if(!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        var filePath = dirPath + model.name + '.java';
        fs.writeFileSync(filePath, ret);
    }

    var remoteOperatorServiceBuilder = new RemoteOperatorServiceBuilder();
    var ret = remoteOperatorServiceBuilder.parse(models);
    if(stringUtil.isNotEmpty(ret)) {
        var dirPath = globalConfig.outputPath + '/operator/';
        var filePath = dirPath + 'RemoteOperatorService.java';
        fs.writeFileSync(filePath, ret);
    }
}

exports.build = build;