/**
 * Created by danney on 16/2/3.
 */
var fs = require('fs');
var util = require('util');
var path = require('path');

var modelsContainer = {
    'model': [],
    'operator': [],
    'viewModel': [],
    'viewController': [],
    'page': [],
    'enum': []
};

var load2 = function(path) {
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
    var filePath = path.resolve(path, 'index.js');
    return fs.existsSync(filePath);
}

var getDirName = function(path) {

}

var loadFile = function(container, filePath) {
    if(path.extname(fileName) == '.js') {
        var model = require(lotus.util.stringUtil.withoutSuffix(filePath, '.js'));
        container.push(model);
    }
}

var loadDir = function(container, dirPath) {
    var contentList = fs.readdirSync(dirPath);
    for(var k in contentList) {
        var fileName = contentList[k];
        var filePath = path.resolve(dirPath, fileName);
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
            var subDirPath = path.resolve(rootPath, item);
            loadDir(container, subDirPath);
        }
    }
}


var load = function(projectPath) {
    var lotus = require('./lotus');

    var contentList = fs.readdirSync(projectPath);
    for(var k in contentList) {
        var item = contentList[k];
        var container = modelsContainer[item];

        if(util.isNullOrUndefined(container)) {
            continue;
        }

        var subDirPath = path.resolve(projectPath, item);
        if(!fs.statSync(subDirPath).isDirectory()) {
            continue;
        }

        var subDirContentList = fs.readdirSync(subDirPath);
        for(var k in subDirContentList) {
            var fileName = subDirContentList[k];
            var filePath = path.resolve(subDirPath, fileName);
            if(!fs.statSync(filePath).isFile()) {
                continue;
            }

            if(path.extname(fileName) != '.js') {
                continue;
            }

            var model = require(lotus.util.stringUtil.withoutSuffix(filePath, '.js'));
            container.push(model);
        }
    }
}

var getModels = function() {
    return modelsContainer.model;
}

var getOperators = function() {
    return modelsContainer.operator;
}

var getViewModels = function() {
    return modelsContainer.viewModel;
}

var getViewControllers = function() {
    return modelsContainer.viewController;
}

var getPages = function() {
    return modelsContainer.page;
}

var getEnums = function() {
    return modelsContainer.enum;
}

var queryModel = function(name) {
    if(modelsContainer.model == null) {
        return null;
    }

    for(var k in modelsContainer.model) {
        var model = modelsContainer.model[k];
        if(model.name == name) {
            return model;
        }
    }
    return null;
}

var queryOperator = function(name) {
    if(modelsContainer.operator == null) {
        return null;
    }

    for(var k in modelsContainer.operator) {
        var operator = modelsContainer.operator[k];
        if(operator.name == name) {
            return operator;
        }
    }
    return null;
}

var queryViewModel = function(name) {
    if(modelsContainer.viewModel == null) {
        return null;
    }

    for(var k in modelsContainer.viewModel) {
        var viewModel = modelsContainer.viewModel[k];
        if(viewModel.name == name) {
            return viewModel;
        }
    }
    return null;
}

var queryViewController = function(name) {
    if(modelsContainer.viewController == null) {
        return null;
    }

    for(var k in modelsContainer.viewController) {
        var model = modelsContainer.viewController[k];
        if(model.name == name) {
            return model;
        }
    }
    return null;
}


exports.load = load;

exports.getPages = getPages;
exports.getModels = getModels;
exports.getOperators = getOperators;
exports.getViewModels = getViewModels;
exports.getViewControllers = getViewControllers;
exports.getEnums = getEnums;

exports.queryOperator = queryOperator;
exports.queryModel = queryModel;
exports.queryViewModel = queryViewModel;
exports.queryViewController = queryViewController;