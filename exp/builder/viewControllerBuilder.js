/**
 * Created by danney on 15/11/22.
 */
var mustache = require('mustache');
var tpl = require('./template');
var nameUtil = require('./javaNameUtil');
var uiControlMetada = require('../metadata/uiControlMetadata');


/**
 * 输入是一个完整的VC 的 js model
 * 输出是一个VC的 java文件
 *
 * */

var ViewControllerBuilder = function() {
    this._codeVariableStmt = "";
    this._codeVariableInitOnCreate = "";
    this._codeOnDestroy = "";
    this._codeOnEvent = "";
    this._codeImport = "";

    this._importRecorder = {
        androidWidget: {},
        viewModel: {},
        viewController: {}
    }
}

ViewControllerBuilder.prototype.parse = function(packageName, model) {
    var v = model['viewModel']
    if(v == null) {
        throw 'no "viewModel" field';
    }

    this._buildViewModel(v);
    this._buildSubViewController(model.content);
    this._buildUIControl(model.content);
    this._buildImport(packageName);

    return mustache.render(tpl.viewController.main, {
        packageName: packageName,
        import: this._codeImport,
        viewControllerName: model.name,
        variableStmt: this._codeVariableStmt,
        layoutFileName: model.name.toLowerCase(),
        viewModelInit: this._codeVariableInitOnCreate,
        viewModelDestroy: this._codeOnDestroy,
        viewModelObserverStmt: this._codeOnEvent
    })
}


ViewControllerBuilder.prototype._buildViewModel = function(className) {
    var className = nameUtil.formatClassName(className);
    var objName = nameUtil.formatObjName(className);

    //变量申明
    var stmt = mustache.render(tpl.viewController.viewModelStmt, {
        viewModelClassName: className,
        viewModelObjName: objName
    });

    this._codeVariableStmt += stmt + '\r';


    //初始化
    var init = mustache.render(tpl.viewController.viewModelInit, {
        viewModelClassName: className,
        viewModelObjName: objName
    });

    this._codeVariableInitOnCreate += init + '\r';

    //销毁
    var destroy = mustache.render(tpl.viewController.viewModelDestroy, {
        viewModelClassName: className,
        viewModelObjName: objName
    });

    this._codeOnDestroy += destroy + '\r';


    //注册监听
    var observer = mustache.render(tpl.viewController.viewModelObserverStmt, {
        viewModelClassName: className,
        viewModelObjName: objName
    });

    this._importRecorder.viewModel[className] = true;

    this._codeOnEvent += observer + '\r';
}

ViewControllerBuilder.prototype._buildSubViewController = function(model) {
    if(model['type'] == 'ViewController') {
        //变量申明
        var className = nameUtil.formatClassName(model.name);
        var objName = nameUtil.formatObjName(model.name);

        var stmt = mustache.render(tpl.viewController.memberVariableStmt, {
            className: className,
            objName: objName
        });

        this._codeVariableStmt += stmt + '\r';

        var init = mustache.render(tpl.viewController.subViewControllerInit, {
            className: className,
            objName: objName,
            containerName: '...'
        });

        this._codeVariableInitOnCreate += init + '\r\r';

        this._importRecorder.viewController[className] = true;
    }
    else {
        var units = model['units'];
        if(units != null) {
            for(var key in units) {
                this._buildSubViewController(units[key]);
            }
        }
    }
}

ViewControllerBuilder.prototype._buildUIControl = function(model) {
    var variableList = [];
    if(model['bind'] != null || model['event'] != null) {
        if(model.type == undefined || model.id == undefined) {
            throw "model type or id can not be undefined";
        }

        //成员变量申明
        var stmt = mustache.render(tpl.viewController.memberVariableStmt, {
            className: model.type,
            objName: model.id
        });

        this._codeVariableStmt += stmt + '\r';

        //init findViewById
        var init = mustache.render(tpl.viewController.viewControlInit, {
            className: model.type,
            objName: model.id
        });

        this._codeVariableInitOnCreate += init + '\r';

        //addEventListener
        this._buildEventListener(model);
        this._codeVariableInitOnCreate += '\r';

        //event listener statement

        //import
        this._importRecorder.androidWidget[model.type] = true;
    }

    var units = model['units'];
    if(units != null) {
        for(var key in units) {
            this._buildUIControl(units[key]);
        }
    }
}

ViewControllerBuilder.prototype._buildEventListener = function(model) {
    var events = model['event']
    if(events == null) {
        return;
    }

    var type = model['type'];

    var metadata = uiControlMetada[type];
    if(metadata == null) {
        return;
    }

    for(var key in events) {
        var event = events[key];

        var eventMetadata = metadata.event[key];
        if(eventMetadata == null) {
            continue;
        }

        var listenerVariableName = getListenerVariableName(model, eventMetadata);//model.id + eventMetada.listenerName;

        var addStr = model.id + '.' + eventMetadata.setListenerMethodName + '(' + listenerVariableName + ');'
        this._codeVariableInitOnCreate += addStr + '\r';

        this._buildEventListenerStatement(model, eventMetadata);
    }
}

ViewControllerBuilder.prototype._buildEventListenerStatement = function(model, eventMetadata) {
    var listenerVariableName = getListenerVariableName(model, eventMetadata);
    var stmt = mustache.render(eventMetadata.listenerImpl, {
        listenerName: listenerVariableName
    });

    this._codeOnEvent += stmt + '\r';
}

ViewControllerBuilder.prototype._buildImport = function(packageName) {
    var w = this._importRecorder.androidWidget
    for(var name in w) {
        this._codeImport += mustache.render(tpl.import.androidWidget, {widgetName: name}) + '\r';
    }
    this._codeImport += '\r'

    var vm = this._importRecorder.viewModel;
    for(var name in vm) {
        this._codeImport += mustache.render(tpl.import.viewModel, {
            packageName: packageName,
            viewModelName: name
        })  + '\r';
    }

    var vc = this._importRecorder.viewController;
    for(var name in vc) {
        this._codeImport += mustache.render(tpl.import.viewController, {
            packageName: packageName,
            viewControllerName: name
        }) + '\r';
    }
}


//helper
function getListenerVariableName(model, eventMetadata) {
    return model.id + eventMetadata.listenerName;
}


module.exports = ViewControllerBuilder;