'use strict'
let R = require('ramda')
let mustache = require('mustache');
let strUtil = require('../util/strUtil')
let widgetParser = require('./widget');
let CodeRecorder = require('../type/codeRecorder');
let parseViewModelsInternal = require('./viewController/parseViewModels');
let Method = require('../typeRN/method');
let Class = require('../typeRN/class');
let CodeBlocks = require('../typeRN/codeBlocks');
let common = require('./common');

let createClass = (model) => {
    let cons = createContructorMethod(model);
    let unmount = createComponentWillUnmountMethod(model);
    let render = createRenderMethod(model);
    let aClass = Class.create(model.name, [], [cons, unmount, render],
        [], 'Component', ['export default'], ['@observer']);
    
    let styleTpl = 'const styles = StyleSheet.create({\r {{content}} \r})';
    let style = mustache.render(styleTpl, {content: model.content.style});

    let codeBlocks = CodeBlocks.create([aClass, style]);
    return codeBlocks;
}

let createContructorMethod = (model) => {
    let superCode = 'super(props);'
    let bodyCodes = [superCode, model.viewModels.cons, model.content.cons]
    let body = R.join('\r', bodyCodes);
    return Method.create('constructor', ['props'], body);
}

let createComponentDidMountMethod = (model) => {

}

let createComponentWillUnmountMethod = (model) => {
    let bodyCodes = [model.viewModels.onDestroy, model.content.onDestroy]
    let body = R.join('\r', bodyCodes);
    return Method.create('componentWillUnmount', [], body);
}

let createRenderMethod = (model) => {
    let tpl = 'return (\r {{content}} \r)'
    let body = mustache.render(tpl, { content: model.content.layout });
    return Method.create('render', [], body);
}

let parseViewModels = (viewModels) => {
    return parseViewModelsInternal(viewModels);
}

let createWidget = function (model) {
    return widgetParser.parse(model);
}

let combineCodeRecorder = (left, right) => {
    let codeRecorder = new CodeRecorder();
    codeRecorder.layout = left.layout + '\r' + right.layout;
    codeRecorder.cons = left.cons + '\r' + right.cons;
    codeRecorder.onCreate = left.onCreate + '\r' + right.onCreate;
    codeRecorder.onDestroy = left.onDestroy + '\r' + right.onDestroy;
    codeRecorder.style = common.combineStyles([left.style, right.style])
    codeRecorder.others = left.others + '\r' + right.others;
    codeRecorder.importLines = R.concat(left.others, right.others);
    return codeRecorder;
}

exports.createClass = createClass;
exports.createWidget = createWidget;
exports.combineCodeRecorder = combineCodeRecorder;
exports.parseViewModels = parseViewModels;