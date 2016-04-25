/**
 * Created by danney on 16/2/4.
 */
var lotus = require('./lotus');
var path = require('path');
var util = require('util');

var start = function(map) {
    var projectPath = map.input;
    var outputPath = map.output;

    console.log('loading project...');

    lotus.projectConfig.load(projectPath);
    lotus.projectConfig.setOutputDir(outputPath);

    var modelLoadUtil = require('./util/modelLoadUtil');

    if(util.isString(map.files)) {
        modelLoadUtil.load(map.files);
    }
    else {
        modelLoadUtil.load(projectPath);
    }

    console.log('loading project...done');

    var builderPaths = [
        path.resolve(__dirname, 'builder'),
        path.resolve(__dirname, 'builderExtend')];

    lotus.builderMgr.load(builderPaths);

    console.log('-------------------init lotus success-------------------');


    var androidBuilder = require('./androidBuilder');
    androidBuilder.startBuild();

    //
    //var serverBuilder = require('./serverBuilder');
    //serverBuilder.startBuild();
}

module.exports = start;