'use strict'
let mustache = require('mustache');
let strUtil = require('../../util/strUtil');
let nameUtil = require('../../util/nameUtil');
let Field = require('../../type/field');

/**
 * 1 create field
 * 2 create view model init in OnCreate
 * 3 create view model addOnPropertyChangedCallback in OnCreate
 * 4 create binding.setRsVM(rsVM);  in onCreateView
 * 5 create remove view model in onDestroy
*/

let createViewModelsInfo = function (vms) {
    let ret = [];
    for(let i = 0; i < vms.length; i++) {
        let vm = vms[i];
        let isMaster = i == 0 ? true: false;
        ret.push(createViewModelInfo(vm, isMaster));
    }
    return ret;
}

let createViewModelInfo = function (vm, isMaster) {
    let field = createViewModelField(vm); 
    let init = createViewModelInit(vm, isMaster);
    let bindingSetter = createBindingSetter(vm);
    let destroy = createViewModelDestroy(vm, isMaster);
    return {
        field: field,
        init: init,
        bindingSetter: bindingSetter,
        destroy: destroy
    }
}

let createViewModelField = function (vm) {
    var filed = new Field();
    filed.type = vm.type;
    filed.name = vm.name;
    return filed;
}

let createViewModelInit = function (vm, isMaster) {
    let tpl = '';
    if(isMaster) {
        tpl = 'createViewModel({{type}}, {{name}});';
    }
    else {
        tpl = 'getViewModel({{type}}, {{name}});';
    }

    return mustache.render(tpl, {type: vm.type, name: vm.name});
}

let createViewModelAddObserver = function (vm) {
    let tpl = '{{name}}.addOnPropertyChangedCallback({{observerName}});'
    return mustache.render(tpl, {
        name: vm.name, 
        observerName: nameUtil.getViewModelObserverName(vm.name) 
    });
}

let createBindingSetter = function (vm) {
    let tpl = 'binding.set{{nameUpper}}({{name}});'
    return mustache.render(tpl, {
        nameUpper: strUtil.firstCharToUppercase(vm.name),
        name: vm.name
    })
}

let createViewModelDestroy = function (vm, isMaster) {
    let code = '';
    let tpl = 'ViewModelMgr.removeViewModel({{type}}.class);'
    if(isMaster == true) {
        code += mustache.render(tpl, {type: vm.type});
    }
    code += vm.name + ' = null';
    return code;
}

exports.createViewModelsInfo = createViewModelsInfo;
exports.createViewModelField = createViewModelField;
exports.createViewModelInit = createViewModelInit;
exports.createViewModelAddObserver = createViewModelAddObserver;
exports.createBindingSetter = createBindingSetter;
exports.createViewModelDestroy = createViewModelDestroy;