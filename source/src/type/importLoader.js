/**
 * Created by danney on 16/6/3.
 */
'use strict'
var lotus = require('../lotus');
var projectConfig = lotus.projectConfig;
var pathUtil = require('path');


class ImportLoader {
    static load(importList) {
        var ClassMgr = require('./classMgr');
        var classMgr = new ClassMgr();

        for(var k in importList) {
            var path = importList[k];
            ImportLoader.loadInternal(path, classMgr);
        }

        return classMgr;
    }

    static loadInternal(path, classMgr) {
        var regModel = /^\$\.(model|operator|viewModel|viewController)\.(\w+)$/g;
        var regSystemType = /^system\.type\.(\w+)$/g;

        if(regModel.test(path)) {
            ImportLoader.importModelFile(path, classMgr);
        }
        else if(regSystemType.test(path)) {
            ImportLoader.importSystemType(path, classMgr);
        }
        else {
            throw 'can not import this type: ' + path;
        }
    }

    static importModelFile(path, classMgr) {
        var realPath = pathUtil.resolve(projectConfig.getProjectPath(), RegExp.$1, RegExp.$2);
        var model = require(realPath);

        var ClassLoader = require('./classLoader');
        var c = ClassLoader.load(model);
        classMgr.add(c.getName(), c);
    }

    static importSystemType(path, classMgr) {
        var type = RegExp.$1;
        var model = null;
        if(type == 'Array') {
            model = require('./array/array');
        }
        else {
            throw 'do not supported type: ' + type;
        }

        var ClassLoader = require('./classLoader');
        var c = ClassLoader.load(model);
        classMgr.add(c.getName(), c);
    }
}

module.exports = ImportLoader;