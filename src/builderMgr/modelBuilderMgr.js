/**
 * Created by danney on 16/1/15.
 */
var fs = require('fs');
var globalConfig = require('../globalConfig');
var ModelBuilder = require('../builder/modelBuilder');

var build = function(models) {
    for(var k in models) {
        var model = models[k];

        var modelBuilder = new ModelBuilder();
        var ret = modelBuilder.parse(model);

        var dirPath = globalConfig.outputPath + '/model/';
        if(!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        var filePath = dirPath + model.name + '.java';
        fs.writeFileSync(filePath, ret);
    }
}

exports.build = build;