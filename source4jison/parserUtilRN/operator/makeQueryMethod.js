'use strict'
let R = require('ramda');
var mustache = require('mustache');
let Method = require('../../typeRN/method');

let makeKV = (item) => {
    let tpl = '{{key}}: params["{{key}}"]'
    return mustache.render(tpl, { key: item.name });
}

let makeParamsByType = R.compose(
    R.join(','),
    R.map(makeKV)
);

let makeHttpParams = R.compose(
    (x) => { return 'let httpParams = { ' + x + '}' },
    R.join(', '),
    R.map((x) => x[0] + ': {' + x[1] + '}'),
    R.toPairs,
    R.map(makeParamsByType),
    R.groupBy((x) => x.paramType)
)

let makeEndPoint = (endPoint) => {
    let tpl = 'const endPoint = "{{endPoint}}";';
    return mustache.render(tpl, { endPoint: endPoint });
}

let makeFetchCalling = (model) => {
    let calling = 'return FetchUtil.fetch(config.baseUrl, endPoint, {}, httpParams)'
    let converter = makeConverter(model);
    if(converter != '') {
        calling = calling + '.' + converter;
    }
    return calling;
}

let makeBody = (model) => {
    let endPoint = makeEndPoint(model.url);
    let params = makeHttpParams(model.parameters);
    let calling = makeFetchCalling(model);
    return endPoint + '\r' + params + '\r' + calling;
}

let makeQueryMethod = (model) => {
    let body = makeBody(model);
    return Method.create('query', ['params'], body);
}

let makeConverter = R.pathOr('', ['responseConverter', 'actions']);

module.exports = makeQueryMethod;