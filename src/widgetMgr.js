/**
 * Created by danney on 16/1/19.
 */
var fs = require('fs');
var util = require('util');
var stringUtil = require('./util/stringUtil');
var WidgetCodeBuilder = require('./builder/widgetCodeBuilder');
var WidgetLayoutBuilder = require('./builder/widgetLayoutBuilder');

var widgets = {};

var load = function() {
    loadInternal('./widget');
}

var loadInternal = function(path) {
    if(!fs.statSync(path).isDirectory()) {
        return null;
    }

    var filePath = path + '/index.js';
    if(fs.existsSync(filePath)) {
        filePath = stringUtil.withoutSuffix(filePath, '.js');
        var widgetInfo = require(filePath);
        widgets[widgetInfo.name] = widgetInfo;
    }
    else {
        var contentList = fs.readdirSync(path);
        for(var k in contentList) {
            var item = contentList[k];
            var dirPath = path + '/' + item;
            loadInternal(dirPath);
        }
    }
}

//var loadInternal = function(path) {
//    if(!fs.statSync(path).isDirectory()) {
//        return null;
//    }
//
//    var contentList = fs.readdirSync(path);
//    for(var k in contentList) {
//        var item = contentList[k];
//
//        var dirPath = 'widget' + '/' + item;
//        if(!(fs.statSync(dirPath).isDirectory())) {
//            //当前item不是目录 则跳过
//            continue;
//        }
//
//        var filePath = './widget' + '/' + item + '/index.js';
//        if(!fs.existsSync(filePath)) {
//            var dirPath = './widget/' + item;
//
//            load(dirPath)
//
//            //如果index.js文件不存在 ，则认为不是一个正常的插件包
//            continue;
//        }
//
//        filePath = filePath.substr(0, filePath.length - 3);
//        var widgetInfo = require(filePath);
//
//        widgets[widgetInfo.name] = widgetInfo;
//
//        //var childDirContentList = fs.readdirSync(dirPath);
//        //for(var j in childDirContentList) {
//        //    var fileName = childDirContentList[j];
//        //    var filePath = dirPath + '/' + fileName;
//        //    if(!fs.statSync(filePath).isFile()) {
//        //        continue;
//        //    }
//        //
//        //    var i = filePath.indexOf(".js");
//        //    filePath = filePath.substring(0, i);
//        //    var obj = require(filePath);
//        //
//        //    //var fileContent = fs.readFileSync(filePath, 'utf-8');
//        //    //var obj = JSON.parse(fileContent);
//        //    array.push(obj);
//        //}
//    }
//}



var queryCodeBuilder = function(name) {
    var widget = widgets[name];
    if(util.isNullOrUndefined(widget)) {
        return null;
    }

    if(util.isNullOrUndefined(widget.codeBuilder)) {
        return WidgetCodeBuilder;
    }

    return widget.codeBuilder;
}

var queryLayoutBuilder = function(name) {
    var widget = widgets[name];
    if(util.isNullOrUndefined(widget) || util.isNullOrUndefined(widget.layoutBuilder)) {
        return WidgetLayoutBuilder;
    }

    return widget.layoutBuilder;
}

var queryCodeBuildConfig = function(name) {
    var widget = widgets[name];
    if(util.isNullOrUndefined(widget)) {
        return null;
    }

    if(util.isNullOrUndefined(widget.codeBuildConfig)) {
        return null;
    }

    return widget.codeBuildConfig;
}

var queryLayoutBuildConfig = function(name) {
    var widget = widgets[name];
    if(util.isNullOrUndefined(widget) || util.isNullOrUndefined(widget.layoutBuildConfig)) {
        return widgets.View.layoutBuildConfig;
    }

    return widget.layoutBuildConfig;
}

exports.queryCodeBuilder = queryCodeBuilder;
exports.queryLayoutBuilder = queryLayoutBuilder;
exports.queryCodeBuildConfig = queryCodeBuildConfig;
exports.queryLayoutBuildConfig = queryLayoutBuildConfig;
exports.load = load;