/**
 * Created by danney on 16/2/3.
 */
var util = require('util');
var fs = require('fs');

var buildersContainer = {
    page: {},

    model: {},
    operator: {},
    viewModel: {},

    viewController: {},
    layout: {},

    widget: {},
    widgetLayout: {},

    widgetBuildConfig: {},
    widgetLayoutBuildConfig: {},

    function: {},

    dependency: {},

    enum: {}
};

var load = function(paths) {
    console.log('loading builder...')
    if(!util.isArray(paths)) {
        throw 'buildMgr loading need path array, please check your input parameter'
    }

    for(var k in paths) {
        var path = paths[k];
        loadInternal(path);
    }
    console.log('loading builder...done');
}

var loadInternal = function(path) {
    var lotus = require('./lotus');

    if(!fs.statSync(path).isDirectory()) {
        return null;
    }

    var filePath = path + '/index.js';
    if(fs.existsSync(filePath)) {
        filePath = lotus.util.stringUtil.withoutSuffix(filePath, '.js');
        var buildersInfo = require(filePath);

        for(var name in buildersInfo) {
            var builders = buildersInfo[name];
            for(var type in builders) {
                var container = buildersContainer[type];
                if(!util.isNullOrUndefined(container)) {
                    container[name] = builders[type];
                }
            }
        }
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

var queryPageBuilder = function(type) {
    if(util.isNullOrUndefined(type)) {
        type = 'default';
    }

    return buildersContainer.page[type];
}

var queryModelBuilder = function(type) {
    if(util.isNullOrUndefined(type)) {
        type = 'default';
    }

    return buildersContainer.model[type];
}

var queryOperatorBuilder = function(type) {
    if(util.isNullOrUndefined(type)) {
        type = 'default';
    }

    return buildersContainer.operator[type];
}

var queryViewModelBuilder = function(type) {
    if(util.isNullOrUndefined(type)) {
        type = 'default';
    }

    var builder = buildersContainer.viewModel[type];
    if(util.isNullOrUndefined(builder)) {
        throw 'can not find operator builder for ' + type;
    }

    return builder;
}

var queryViewControllerBuilder = function(type) {
    if(util.isNullOrUndefined(type)) {
        type = 'default';
    }

    var builder = buildersContainer.viewController[type];
    if(util.isNullOrUndefined(builder)) {
        throw 'can not find viewController builder for ' + type;
    }

    return builder;
}

var queryLayoutBuilder = function(type) {
    if(util.isNullOrUndefined(type)) {
        type = 'default';
    }

    var builder = buildersContainer.layout[type];
    if(util.isNullOrUndefined(builder)) {
        throw 'can not find layout builder for ' + type;
    }

    return builder;
}

var queryWidgetBuilder = function(type) {
    if(util.isNullOrUndefined(type)) {
        type = 'default';
    }

    var builder = buildersContainer.widget[type];
    if(!util.isNullOrUndefined(builder)) {
        return builder;
    }

    builder = buildersContainer.widget['default'];
    if(util.isNullOrUndefined(builder)) {
        throw 'can not find widget builder for ' + type;
    }
    return builder;
}

var queryWidgetLayoutBuilder = function(type) {
    if(util.isNullOrUndefined(type)) {
        type = 'default';
    }

    var builder = buildersContainer.widgetLayout[type];
    if(!util.isNullOrUndefined(builder)) {
        return builder;
    }

    builder = buildersContainer.widgetLayout['default'];
    if(util.isNullOrUndefined(builder)) {
        throw 'can not find widget layout builder for ' + type;
    }
    return builder;
}

var queryWidgetBuildConfig = function(type) {
    return buildersContainer.widgetBuildConfig[type];
}

var queryWidgetLayoutBuildConfig = function(type) {
    var config = buildersContainer.widgetLayoutBuildConfig[type];

    if(util.isNullOrUndefined(config)) {
        config = buildersContainer.widgetLayoutBuildConfig.View;
    }
    return config();
}

var queryFunctionBuilder = function() {

}

var queryWidgetDependency = function(type) {
    if(util.isNullOrUndefined(type)) {
        throw 'queryWidgetDependency, type can not be null';
    }

    return buildersContainer.dependency[type];
}

var queryEnumBuilder = function(type) {
    if(util.isNullOrUndefined(type)) {
        type = 'default';
    }
    return buildersContainer.enum[type];
}

exports.queryPageBuilder = queryPageBuilder;
exports.queryModelBuilder = queryModelBuilder;
exports.queryOperatorBuilder = queryOperatorBuilder;
exports.queryViewModelBuilder = queryViewModelBuilder;
exports.queryViewControllerBuilder = queryViewControllerBuilder;
exports.queryEnumBuilder = queryEnumBuilder;
exports.queryLayoutBuilder = queryLayoutBuilder;
exports.queryWidgetBuilder = queryWidgetBuilder;
exports.queryWidgetLayoutBuilder = queryWidgetLayoutBuilder;
exports.queryWidgetBuildConfig = queryWidgetBuildConfig;
exports.queryWidgetLayoutBuildConfig = queryWidgetLayoutBuildConfig;
exports.queryWidgetDependency = queryWidgetDependency;

exports.load = load;