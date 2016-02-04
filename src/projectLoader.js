/**
 * Created by danney on 16/1/15.
 */
var fs = require('fs');
var modelDataMgr = require('./modelDataMgr');
var widgetMgr = require('./widgetMgr');


var load = function(projectPath) {
    var modelData = loadProject(projectPath);
    modelDataMgr.setModelData(modelData);
    loadWidget();
}

var loadProject = function(projectPath) {
    var modelData = {
        'model': [],
        'operator': [],
        'viewModel': [],
        'viewController': [],
        'page': []
    };

    var contentList = fs.readdirSync(projectPath);
    for(var k in contentList) {
        var item = contentList[k];
        var array = modelData[item];
        var dirPath = projectPath + '/' + item;

        //当前目录名字不在需要处理的列表内，或者 当前item不是目录
        if(array == undefined || array == null ||
            !(fs.statSync(dirPath).isDirectory())) {
            continue;
        }

        var childDirContentList = fs.readdirSync(dirPath);
        for(var j in childDirContentList) {
            var fileName = childDirContentList[j];
            var filePath = dirPath + '/' + fileName;
            if(!fs.statSync(filePath).isFile()) {
                continue;
            }

            var i = filePath.indexOf(".js");
            if(i < 0) {
                continue;
            }
            filePath = filePath.substring(0, i);
            var obj = require(filePath);
            array.push(obj);
        }
    }

    return modelData;
}

var loadWidget = function() {
    widgetMgr.load();
}

exports.load = load;