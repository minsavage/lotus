/**
 * Created by danney on 16/6/25.
 */
var mustache = require('mustache');
var Class = require('../type/class');
var Method = require('../type/method');
var Parameter = require('../type/parameter');
var Field = require('../type/field');
var util = require('util');
var strUtil = require('../util/strUtil');

var createClass = function() {
    var vcClass = new Class();
    vcClass.superClass = 'ViewController';
    return vcClass;
}

var createEssentialMethod = function(vcClass, onCreate, onCreateView, onDestroy) {
    var fns = [];
    fns.push(createOnCreateMethod(onCreate));
    fns.push(createOnCreateViewMethod(onCreateView));
    fns.push(createOnDestroyMethod(onDestroy));
    vcClass.addMethods(fns);
}

var createOnCreateMethod = function(code) {
    var method = new Method();

    var body = 'native(\'super.onCreate(savedInstanceState);\')';
    body = body + '\r' + code;

    var parameter = new Parameter();
    parameter.type = 'Bundle';
    parameter.name = 'savedInstanceState';

    method.name = 'onCreate';
    method.returnType = 'void';
    method.annotations.push('@Override');
    method.parameters.push(parameter);
    method.body = body;
    return method;
}

var createOnCreateViewMethod = function(code) {
    var method = new Method();

    var body =
        'binding = DataBindingUtil.inflate(inflater, R.layout.vc_post_detail_top, container, true);' +
        'binding.setPdtVM(pdtVM);' +
        'View view = binding.getRoot();';

    body = wrapNative(body) +
            code +
            wrapNative('return view;');

    var parameter;
    parameter = new Parameter();
    parameter.type = 'LayoutInflater';
    parameter.name = 'inflater';
    method.parameters.push(parameter);

    parameter = new Parameter();
    parameter.type = 'ViewGroup';
    parameter.name = 'container';
    method.parameters.push(parameter);

    parameter = new Parameter();
    parameter.type = 'Bundle';
    parameter.name = 'savedInstanceState';
    method.parameters.push(parameter);

    method.name = 'onCreateView';
    method.returnType = 'void';
    method.annotations.push('@Override');

    method.body = body;
    return method;
}

var createOnDestroyMethod = function(code) {
    var method = new Method();

    var body = wrapNative('super.onDestroy();');
    body = body + '\r' + code;

    method.name = 'onDestroy';
    method.returnType = 'void';
    method.annotations.push('@Override');
    method.body = body.trim();
    return method;
}

var createViewModelsFiled = function (vcClass, viewModels) {
    var vms = [];
    for(var k in viewModels) {
        var vm = viewModels[k];
        vms.push(createVMFiled(vm));
    }
    vcClass.addFields(vms);
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

var createEvents = function(vcClass, model) {
    if(util.isNullOrUndefined(model.event)) {
        return null;
    }

    if(util.isNullOrUndefined(model.id)) {
        throw 'missing widget id when parse events'
    }

    var fns = [];
    for(var name in model.event) {
        var func = model.event[name];
        fns.push(createEvent(model.id, name, func));
    }
    vcClass.addMethods(fns);
}

var createEvent = function (id, name, func) {
    name = strUtil.firstCharToUppercase(name);

    var annotationTpl = '@{{name}}(R.id.{{id}})';
    var annotation = mustache.render(annotationTpl, {
        name: name,
        id: id
    })

    var method = new Method();
    method.name = id + name;
    method.returnType = 'void';
    method.parameters = [];
    method.annotations.push(annotation);
    method.body = func;
    return method;
}

var wrapNative = function (code) {
    return 'native(\'' + code + '\');';
}

var final = function(vcClass) {
    for(var k in vcClass.methods) {
        var m = vcClass.methods[k];
        if(strUtil.isNotEmpty(m.body)) {
            m.body = stringFuncToAST(m.body);
        }
    }
}

var stringFuncToAST = function (code) {
    var reg = /function\s*\(\)\s*\{\s*(.*)\s*\}/g;
    if(reg.test(code)) {
        code = RegExp.$1;
    }

    var esprima = require('esprima');
    var ast = esprima.parse(code);
    return ast.body;
}

exports.createClass = createClass;
exports.createEssentialMethod = createEssentialMethod;
exports.createViewModelsFiled = createViewModelsFiled;
exports.createViewModelsInit = createViewModelsInit;
exports.createEvents = createEvents;
exports.final = final;