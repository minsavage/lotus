'use strict'
let R = require('ramda')
let mustache = require('mustache');
let strUtil = require('../../util/strUtil')
let CodeRecorder = require('../../type/codeRecorder');

const regStyle = /\@\{.*\}/;

let parseViewModels = (viewModels) => {
    let initCode = { create: '', destroy: '', init: '' };

    let viewModelsToCode = R.addIndex(R.map)((vm, index) => {
        let isMaster = index == 0 ? true : false;
        return parseViewModel(vm, isMaster);
    })

    let joinViewModelsCode = R.reduce((pre, curr) => {
        return {
            create: pre.create + curr.create,
            destroy: pre.destroy + curr.destroy,
            init: pre.init + curr.init,
        }
    }, initCode);

    let makeCodeRecord = (code)=>{
        let codeRecorder = new CodeRecorder();
        codeRecorder.cons = code.create;
        codeRecorder.cons += '\r' + code.init;
        codeRecorder.onDestroy = code.destroy;
        return codeRecorder;
    }

    let parse = R.compose(
        makeCodeRecord,
        joinViewModelsCode,
        viewModelsToCode
    );

    return parse(viewModels);
}

let parseViewModel = (viewModel, isMaster) => {
    let tplCreate = 'this.{{name}} = ViewModelMgr.createViewModel({{type}});'
    let tplGet = 'this.{{name}} = ViewModelMgr.getViewModel({{type}});'
    let tplOnDestroy = 'ViewModelMgr.removeViewModel(this.{{name}});\rthis.{{name}} = null;';
    let tplOnDestroyWithoutRemove = 'this.{{name}} = null;'

    let createCode = '';
    let destroyCode = '';
    if(isMaster) {
        createCode = mustache.render(tplCreate, { name: viewModel.name, type: viewModel.type });
        destroyCode = mustache.render(tplOnDestroy, { name: viewModel.name });
    }
    else {
        createCode = mustache.render(tplGet, { name: viewModel.name, type: viewModel.type });
        destroyCode = mustache.render(tplOnDestroyWithoutRemove, { name: viewModel.name });
    }

    let parseInit = R.compose(
        R.join('\r'),
        R.map((item) => {
            let tpl = 'this.{{name}}.{{key}} = {{value}};'
            let k = item[0];
            let v = item[1];
            if (regStyle.test(v)) {
                v = v.substr(2, v.length - 3);
            }
            else if (R.is(String, v)) {
                v = '\'' + v + '\'';
            }

            return mustache.render(tpl, {
                name: viewModel.name,
                key: k,
                value: v
            });
        }),
        R.toPairs
    )
    let initCode = '';
    if (!R.isNil(viewModel.init)) {
        initCode = parseInit(viewModel.init);
    }
    return {
        create: createCode,
        destroy: destroyCode,
        init: initCode
    }
}

module.exports = parseViewModels;