/**
 * Created by danney on 16/6/25.
 */
var mustache = require('mustache');
var Field = require('../type/field');

var createViewModelsFiled = function (viewModels) {
    var vms = [];
    for(var k in viewModels) {
        var vm = viewModels[k];
        vms.push(createVMFiled(vm));
    }
    return vms;
}

var createVMFiled = function (vm) {
    var filed = new Field();
    filed.type = vm.type;
    filed.name = vm.name;
    return filed;
}

var createViewModelsInit = function (viewModels) {
    var vmsInit = [];
    for(var k in viewModels) {
        var vm = viewModels[k];
        var isMaster = k == 0 ? true: false;
        vmsInit.push(createVMInit(vm, isMaster) + '\r');
    }
    return vmsInit;
}

var createVMInit = function (vm, isMaster) {
    var tpl = '';
    if(isMaster) {
        tpl = 'createViewModel({{type}}, {{name}});';
    }
    else {
        tpl = 'getViewModel({{type}}, {{name}});';
    }

    return mustache.render(tpl, {type: vm.type, name: vm.name});
}

exports.createViewModelsFiled = createViewModelsFiled;
exports.createViewModelsInit = createViewModelsInit;