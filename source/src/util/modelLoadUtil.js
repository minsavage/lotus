/**
 * Created by danney on 16/4/19.
 */
var fs = require('fs');
var util = require('util');
var pathUtil = require('path');
var stringUtil = require('./stringUtil');

var modelsContainer = {
    'model': [],
    'operator': [],
    'viewModel': [],
    'viewController': [],
    'page': [],
    'enum': []
};

var load = function(path) {
    var lotus = require('../lotus');
    modelsContainer = lotus.modelMgr.getAll();

    if(isDir(path)) {
        if(isRootDir(path)) {
            loadAll(path);
        }
        else {
            var dirName = getDirName(path);
            loadDir(dirName, path);
        }
    }
    else {
        var dirName = getDirName(path);
        var container = modelsContainer[dirName];
        if(!util.isNullOrUndefined(container)) {
            loadFile(container, path);
        }
    }
}

var isDir = function(path) {
    return fs.statSync(path).isDirectory();
}

var isRootDir = function(path) {
    var filePath = pathUtil.resolve(path, 'index.js');
    return fs.existsSync(filePath);
}

var getDirName = function(path) {
    var array = pathUtil.split(path.seq);
    if(isDir(path)) {
        return array[array.length-1];
    }
    else {
        return array[array.length-2];
    }
}

var loadFile = function(container, filePath) {
    var fileName = pathUtil.basename(filePath);
    if(pathUtil.extname(fileName) == '.js') {
        var model = require(stringUtil.withoutSuffix(filePath, '.js'));
        container.push(model);
    }
}

var loadDir = function(container, dirPath) {
    var contentList = fs.readdirSync(dirPath);
    for(var k in contentList) {
        var fileName = contentList[k];
        var filePath = pathUtil.resolve(dirPath, fileName);
        if(fs.statSync(filePath).isFile()) {
            loadFile(container, filePath);
        }
    }
}

var loadAll = function(rootPath) {
    var contentList = fs.readdirSync(rootPath);
    for(var k in contentList) {
        var item = contentList[k];
        var container = modelsContainer[item];

        if (!util.isNullOrUndefined(container)) {
            var subDirPath = pathUtil.resolve(rootPath, item);
            loadDir(container, subDirPath);
        }
    }
}

exports.load = load;