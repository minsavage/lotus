/**
 * Created by danney on 16/1/16.
 */
var modelData = null;

var setModelData = function(data) {
    modelData = data;
}

var getModels = function() {
    return modelData.model;
}

var getOperators = function() {
    return modelData.operator;
}

var getViewModels = function() {
    return modelData.viewModel;
}

var getViewControllers = function() {
    return modelData.viewController;
}

var getPages = function() {
    return modelData.page;
}

var queryOperator = function(name) {
    if(modelData.operator == null) {
        return null;
    }

    for(var k in modelData.operator) {
        var operator = modelData.operator[k];
        if(operator.name == name) {
            return operator;
        }
    }
    return null;
}

var queryModel = function(name) {
    if(modelData.model == null) {
        return null;
    }

    for(var k in modelData.model) {
        var model = modelData.model[k];
        if(model.name == name) {
            return model;
        }
    }
    return null;
}

var queryViewModel = function(name) {
    if(modelData.viewModel == null) {
        return null;
    }

    for(var k in modelData.viewModel) {
        var viewModel = modelData.viewModel[k];
        if(viewModel.name == name) {
            return viewModel;
        }
    }
    return null;
}

var queryViewController = function(name) {
    if(modelData.viewController == null) {
        return null;
    }

    for(var k in modelData.viewController) {
        var model = modelData.viewController[k];
        if(model.name == name) {
            return model;
        }
    }
    return null;
}

exports.setModelData = setModelData;
exports.getModels = getModels;
exports.getOperators = getOperators;
exports.getViewModels = getViewModels;
exports.getViewControllers = getViewControllers;

exports.queryOperator = queryOperator;
exports.queryModel = queryModel;
exports.queryViewModel = queryViewModel;
exports.queryViewController = queryViewController;

exports.getPages = getPages;