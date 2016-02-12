/**
 * Created by danney on 16/2/4.
 */
var lotus = require('./lotus');
var path = require('path');

var projectPath = path.resolve(__dirname, '../projectWB');
var builderPaths = ['./builder', './builderExtend'];

lotus.projectConfig.load(projectPath);
lotus.projectConfig.setOutputDir(path.resolve(__dirname, '../output'));

lotus.modelMgr.load(projectPath);
lotus.builderMgr.load(builderPaths);

var androidBuilder = require('./androidBuilder');
androidBuilder.startBuild();