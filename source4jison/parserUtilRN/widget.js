'use strict'
let R = require('ramda')
let mustache = require('mustache');
let strUtil = require('../util/strUtil')
let CodeRecorder = require('../type/codeRecorder');
let common = require('./common');

const regStyle = /\@\{.*\}/;

const excludedPropNames = {
    'type': true,
    'id': true,
    'units': true,
    'style': true
}

let parse = (model) => {
    let codeRecorder = new CodeRecorder();
    codeRecorder.layout = parseLayout(model);

    let style = parseStyle(model);
    let styleChild = R.pathOr('', ['units', 'style'], model);
    codeRecorder.style = common.combineStyles([style, styleChild])
    return codeRecorder;
}

let parseLayout = (model) => {
    if (model.type == 'Plain') {
        return model.content;
    }

    let props = getPropsCode(model);
    let unitsLayout = R.pathOr(false, ['units', 'layout'], model);

    let tpl1 = '<{{type}} {{props}}>\r{{units}}\r</{{type}}>'
    let tpl2 = '<{{type}} {{props}} />'
    let tpl = unitsLayout == false ? tpl2 : tpl1;

    return mustache.render(tpl, {
        type: model.type,
        props: props,
        units: unitsLayout
    });
}

let getStyleCodeForProps = (model) => {
    if (!model.style instanceof Object) {
        return '';
    }

    if (strUtil.isEmpty(model.id)) {
        throw 'need "id" when build style'
    }

    const tpl1 = 'style={styles.{{id}}}';
    const tpl2 = 'style={[styles.{{id}}, { {{bindingStyle}} }]}';

    let bindingStyles = getBindingStyles(model.style);
    let tpl = R.isEmpty(bindingStyles) ? tpl1 : tpl2;

    return mustache.render(tpl, {
        id: model.id,
        bindingStyle: stylesToCode(bindingStyles)
    })
}

let getBindingStyles = R.compose(
    R.map((style) => style.substr(2, style.length - 3)),
    R.filter((style) => regStyle.test(style))
)

let getStylesWitoutBinding = R.filter(x => !regStyle.test(x));

let stylesToCode = R.compose(
    R.join(','),
    R.map((style) => style[0] + ': ' + style[1]),
    R.toPairs
)

let getExcludePropNames = () => {
    return excludedPropNames;
}

let getOtherProps = R.compose(
    R.filter((prop) => {
        let excludeKeys = getExcludePropNames();
        let key = prop[0];
        return excludeKeys[key] ? false : true;
    }),
    R.toPairs
);

let propsToCode = R.compose(
    R.join(' '),
    R.map((prop) => prop[0] + '={' + prop[1] + '}')
)

let parseOtherProps = R.compose(
    propsToCode,
    getOtherProps
)

let getPropsCode = (model) => {
    let code = getStyleCodeForProps(model) + ' ' + parseOtherProps(model);
    return code.trim();
}

let parseStyle = (model) => {
    if (!R.is(Object, model.style)) {
        return ''
    }

    let tpl = '{{name}}: { {{content}} }'
    let styles = getStylesWitoutBinding(model.style);
    if (R.isEmpty(styles)) {
        return '';
    }

    let code = stylesToCode(styles);
    return mustache.render(tpl, {
        name: model.id,
        content: code
    })
}

let parser = {
    parse: parse,
    parseLayout: parseLayout,
    getPropsCode: getPropsCode,
    getExcludePropNames: getExcludePropNames,
    excludedPropNames: excludedPropNames
}

module.exports = parser;