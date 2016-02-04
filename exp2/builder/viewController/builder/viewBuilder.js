/**
 * Created by danney on 15/12/5.
 */
var tpl = require('../../template');
var mustache = require('mustache');
var CodeFragment = require('../codeFragment');
var uiControlMetadata = require('../metadata/uiControlMetadata');

var ViewBuilder = function() {}

ViewBuilder.prototype.parse = function(model) {
    if(model.event == undefined || model.event == null) {
        return null;
    }

    var codeFragment = new CodeFragment();

    codeFragment.addImport(this._buildImport(model));
    codeFragment.addVariableStatment(this._buildVariableStatement(model));
    codeFragment.addOnCreateInit(this._buildInit(model));

    var buildEventResult = this._buildEvent(model);
    if(buildEventResult != null) {
        codeFragment.addOnCreateInit(buildEventResult.init);
        codeFragment.addEvent(buildEventResult.impl);
    }

    return codeFragment;
}

ViewBuilder.prototype._buildImport = function(model) {
    return 'android.widget' + model.type;
}

//成员变量申明
ViewBuilder.prototype._buildVariableStatement = function(model) {
    return mustache.render(tpl.viewController.memberVariableStmt, {
        className: model.type,
        objName: model.id
    });
}

//init findViewById
ViewBuilder.prototype._buildInit = function(model) {
    return mustache.render(tpl.viewController.viewControlInit, {
        className: model.type,
        objName: model.id
    });
}

ViewBuilder.prototype._buildEvent = function(model) {
    return null;

    var eventsCode = {
        /*
        *    listner1: {
        *       'onClick': 'code......',
        *       'onXXXX': 'code.......',
        *    },
        *
        *    listner2: {
        *       'onClick': 'code......',
        *       'onXXXX': 'code.......',
        *    }
        *
        *
        * */
    };

    var events = model.event;
    for(var eventName in events) {
        var eventListener = eventMetadata[eventName];
        if(eventListener == undefined || eventListener == null) {
            //throw 'not supported event, model.type = '+ model.type + ', event = ' + eventName;
            return null;
        }

        if(eventsCode[eventListener] == undefined) {
            eventsCode[eventListener] = {};
        }

        eventsCode[eventListener][eventName] = this._buildEventFunction(eventName, events[eventName]);
    }

    var metadata = uiControlMetadata[type];
    if(metadata == undefined || metadata == null) {
        return null;
    }

    var eventMetadata = metadata.event;
    if(eventMetadata == undefined || eventMetadata == null) {
        return null;
    }






    for(var listenerName in eventsCode) {
        var listenerSetter = mustache.render(desp.ImplTemplate, templateData);

    }

    var addStr = model.id + '.' + eventMetadata.setListenerMethodName + '(' + listenerVariableName + ');'



    var listenersImpl = '';
    for(var listenerName in eventsCode) {
        var desp = eventListenerDescritionList[listenerName];
        var templateData = {};
        for(var key in desp.methods) {
            var method = desp.methods[key];
            templateData[method] = eventsCode[listenerName][method];
        }

        var listenerSetter = mustache.render(desp.setterTemplate, {
            viewName: model.id,
            listenerName: var listenerVariableName = getListenerVariableName(model, eventMetadata)


        });
        var listenerImpl = mustache.render(desp.ImplTemplate, templateData);
        listenersImpl += listenerImpl;
    }

    return {
        'init': '',
        'impl': listenersImpl
    }
}

ViewBuilder.prototype._buildEventFunction = function(code) {
    return '';
}

//var map = {
//    'onClick': 'View.OnClickListener'
//}
//
//var metadata = {
//    'onOpen': 'onSlideSwitchListener',
//    'onClose': 'onSlideSwitchListener',
//    'onClick': 'onSlideSwitchListener',
//    'onProgress': 'onSlideSwitchListener',
//    'onClick': 'onCLickListener',
//    'onLongClick': 'onLongClickListener'
//}
//
//var map2 = {
//    'onSlideSwitchListener': ['onOpen', 'onClose', 'onClick', 'onProgress']
//}
//
//var code = {
//    'onSlideSwitchListener': {
//        'setter': 'setSlideSwitchListener',
//        'impl':
//    }
//
//}


module.exports = ViewBuilder;

//var eventMetadata = {
//    'onClick': 'View.OnClickListener'
//}
//
//var eventListenerDescritionList = {
//    'View.OnClickListener': {
//        name: 'OnClickListener',
//        methods: ['onClick', 'onLongClick'],
//        setterTemplate: '{{viewName}}.setOnClickListener({{listenerName}})',
//        ImplTemplate: tpl.listener.onClickListener
//    }
//}

//helper
function getListenerVariableName(model, listenerName) {
    return model.id + listenerName;
}