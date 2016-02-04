/**
 * Created by danney on 16/1/16.
 */
var fs = require('fs');
var stringUtil = require('../util/stringUtil');
var globalConfig = require('../globalConfig');
var ViewModelBuilder = require('../builder/viewModel/viewModelBuilder');
var ListViewModelBuilder = require('../builder/viewModel/listViewModelBuilder');
var ModelBuilder = require('../builder/modelBuilder');
var OperatorBuilder = require('../builder/modelOperatorBuilder');
var ViewControllerBuilder = require('../builder/viewControllerBuilder');
var ListViewControllerBuilder = require('../builder/listViewControllerBuilder');
var TabViewControllerBuilder = require('../builder/viewController/tabViewControllerBuilder');
var LayoutBuilder = require('../builder/layoutBuilder');

var build = function(type, models) {
    for(var k in models) {
        var model = models[k];

        var builder;
        if(type == 'viewModel' && model.type == 'ListViewModel') {
            builder = new ListViewModelBuilder();
        }
        else if(type == 'viewController' && model.type == 'ListViewController') {
            builder = new ListViewControllerBuilder();
        }
        else if(type == 'viewController' && model.type == 'TabViewController') {
            builder = new TabViewControllerBuilder();
        }
        else {
            builder = getBuilder(type);
        }

        var ret = builder.parse(model);
        if(!stringUtil.isNotEmpty(ret)) {
            continue;
        }

        var dirPath = globalConfig.outputPath + '/' + type + '/';
        if(!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        var filePath = dirPath + model.name + '.java';
        fs.writeFileSync(filePath, ret);
    }
}

var getBuilder = function(type) {
    if(type == 'model') {
        return new ModelBuilder();
    }
    else if(type == 'operator') {
        return new OperatorBuilder();
    }
    else if(type == 'viewModel') {
        return new ViewModelBuilder();
    }
    else if(type == 'viewController') {
        return new ViewControllerBuilder();
    }
    else if(type == 'layout') {
        return new LayoutBuilder();
    }
    else {
        return null;
    }
}

exports.build = build;