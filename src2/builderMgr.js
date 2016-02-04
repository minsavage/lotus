/**
 * Created by danney on 16/2/3.
 */
util = require('util');

var buildersContainer = {
    model: {},
    operator: {},
    viewModel: {},
    viewController: {},
    page: {}
};

var load = function(paths) {
    if(!util.isArray(paths)) {
        throw 'buildMgr loading need path array, please check your input parameter'
    }

    for(var k in paths) {
        var path = paths[k];
        loadInternal(path);
    }
}

var loadInternal = function(path) {
    if(!fs.statSync(path).isDirectory()) {
        return null;
    }

    var filePath = path + '/index.js';
    if(fs.existsSync(filePath)) {
        filePath = stringUtil.withoutSuffix(filePath, '.js');
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

var queryModelBuilder = function() {

}

var queryOperatorBuilder = function() {
}

var queryViewModelBuilder = function() {

}

var queryViewControllerBuilder = function() {

}

var queryLayoutBuilder = function() {

}

var queryWidgetBuilder = function() {

}

var queryWidgetLayoutBuilder = function() {

}

var queryManifestBuilder = function() {

}

var queryGradleBuilder = function() {

}

var queryWidgetBuildConfig = function() {

}

var queryWidgetLayoutBuildConfig = function() {

}

exports.queryModelBuilder = queryModelBuilder;
exports.queryOperatorBuilder = queryOperatorBuilder;
exports.queryViewModelBuilder = queryViewModelBuilder;
exports.queryViewControllerBuilder = queryViewControllerBuilder;
exports.queryLayoutBuilder = queryLayoutBuilder;
exports.queryWidgetBuilder = queryWidgetBuilder;
exports.queryWidgetLayoutBuilder = queryWidgetLayoutBuilder;
exports.queryWidgetBuildConfig = queryWidgetBuildConfig;
exports.queryWidgetLayoutBuildConfig = queryWidgetLayoutBuildConfig;
exports.load = load;