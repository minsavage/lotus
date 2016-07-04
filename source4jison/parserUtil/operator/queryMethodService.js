/**
 * Created by danney on 16/7/4.
 */
var R = require('ramda');
var mustache = require('mustache');
var Method = require('../../type/method');
var Parameter = require('../../type/parameter');
var common = require('./common');
var queryMethodName = common.queryMethodName;
var parametersConfigGrouped = common.parametersConfigGrouped;
var mergeThree = common.mergeThree;

//build parameters
var pathParameter = function(parameter) {
    var para = new Parameter();
    para.name = parameter.name;
    para.type = parameter.type;

    var annotation = mustache.render('@Path("{{name}}")', {name: para.name});
    para.annotations.push(annotation);

    return para;
}

var pathParameters = R.compose(
    R.map(pathParameter),
    R.prop('path')
);

var bodyParameter = function() {
    var para = new Parameter();
    para.name = 'parameters';
    para.type = 'Map<String, Object>';
    para.annotations.push('@Body');
    return para;
}

var queryMapParameter = function() {
    var para = new Parameter();
    para.name = 'parameters';
    para.type = 'Map<String, Object>';
    para.annotations.push('@QueryMap');
    return para;
}

var pathParametersIfExist = R.ifElse(R.has('path'), pathParameters, ()=> []);
var bodyParametersIfExist = R.ifElse(R.has('json'), bodyParameter, ()=> []);
var queryParametersIfExist = R.ifElse(R.has('queryMap'), queryMapParameter, ()=> []);

var methodParameters = R.converge(
    mergeThree,
    [pathParametersIfExist, bodyParametersIfExist, queryParametersIfExist]
);

var makeMethodParameters = R.compose(
    methodParameters,
    parametersConfigGrouped
);

//annotation
var httpMethodToAnnotation = R.cond([
    [R.equals('get'), R.always('@GET')],
    [R.equals('post'), R.always('@POST')],
    [R.T, R.always('@GET')]
]);

var httpMethodAnnotation = R.compose(
    httpMethodToAnnotation,
    R.prop('method')
);

var annotationWithUrl = (method, url) => {
    return method + '("' + url + '")';
}

var makeAnnotation = R.converge(annotationWithUrl, [httpMethodAnnotation, R.prop('url')]);

//return type
var observableReturnTypeForService = R.compose(
    R.join(''),
    R.map(x=>{return 'Observable<' + x + '>'}),
    R.of,
    R.prop('responseType')
);

//build method
var buildQueryMethodForService = (name, returnType, parameter, annotaion) => {
    var method = new Method();
    method.name = name;
    method.returnType = returnType;
    method.parameters.push(parameter);
    method.annotations.push(annotaion);
    return method;
}

// final make
var make = R.converge(
    buildQueryMethodForService,
    [
        queryMethodName,
        observableReturnTypeForService,
        makeMethodParameters,
        makeAnnotation
    ]
);

exports.make = make;