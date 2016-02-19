/**
 * Created by danney on 16/2/4.
 */
var path = require('path');
var util = require('util');
var config = null;
var outputDir = null;


var load = function(projectPath) {
    var path = require('path');
    var indexPath = path.resolve(projectPath, 'index.js');
    config = require(indexPath);
}

var get = function(key) {
    return config[key];
}

var setOutputDir = function(path) {
    outputDir = path;
}

var getOutputDir = function() {
    return outputDir;
}

var getPackageName = function() {
    return config.organizationDomain + '.' + config.productName.toLowerCase();
}

var getServerDomain = function() {
    var serverConfig =  config.server;
    var port = '';
    if(!util.isNullOrUndefined(serverConfig.port)) {
        port = ':' + serverConfig.port
    }

    return 'http://' + serverConfig.domain + port + '/';
}

var srcDir = null;
var getSrcDir = function() {
    if(srcDir == null) {
        var array = config.organizationDomain.split('.');
        srcDir = path.join(outputDir, config.productName, 'app/src/main/java', array[0], array[1], config.productName.toLowerCase());
    }
    return srcDir;
}

var resDir = null;
var getResDir = function() {
    if(resDir == null) {
        resDir = path.join(outputDir, config.productName, 'app/src/main/res');
    }
    return resDir;
}

var manifestDir = null;
var getManifestDir = function() {
    if(manifestDir == null) {
        manifestDir = path.join(outputDir, config.productName, 'app/src/main');
    }
    return manifestDir;
}

var getServerDir = function() {
    return path.join(outputDir, 'server');
}

exports.load = load;
exports.get = get;
exports.getPackageName = getPackageName;
exports.getServerDomain = getServerDomain;
exports.setOutputDir = setOutputDir;
exports.getOutputDir = getOutputDir;
exports.getSrcDir = getSrcDir;
exports.getResDir = getResDir;
exports.getManifestDir = getManifestDir;
exports.getServerDir = getServerDir;