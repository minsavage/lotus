/**
 * Created by danney on 16/2/4.
 */
var lotus = require('./lotus');
var path = require('path');

var start = function(map) {
    var projectPath = map.input;
    var outputPath = map.output;

    //lotus.projectConfig.load(projectPath);
    //lotus.projectConfig.setOutputDir(outputPath);

    var modelLoadUtil = require('./util/modelLoadUtil');
    var x = modelLoadUtil.load(projectPath);



    //var builderPaths = ['./builder', './builderExtend'];
    //
    //
    //lotus.modelMgr.load(projectPath);
    //lotus.builderMgr.load(builderPaths);
    //
    //var androidBuilder = require('./androidBuilder');
    //androidBuilder.startBuild();
    //
    //var serverBuilder = require('./serverBuilder');
    //serverBuilder.startBuild();
}

module.exports = start;