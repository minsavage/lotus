/**
 * Created by danney on 16/7/4.
 */
var R = require('ramda');
var Method = require('../../type/method');
var Parameter = require('../../type/parameter');
var common = require('./common');
var makeMethodBody = require('./methodBody').makeBody;
var mergeThree = common.mergeThree;
var queryMethodName = common.queryMethodName;
var parametersConfigGrouped = common.parametersConfigGrouped;

//build return type
var returnTypeWithPath = R.pathOr(R.__, ['responseConverter', 'convertedType']);
var returnType = R.converge(returnTypeWithPath, [R.prop('responseType'), R.always]);
var observableReturnType = R.compose(
    R.join(''),
    R.map(x=>{return 'Observable<' + x + '>'}),
    R.of,
    returnType
);

//build parameter
var queryParameter = () => {
    var parameter = new Parameter();
    parameter.type = 'Map<String, Object>';
    parameter.name = 'parameters';
    return parameter;
};

var buildQueryMethod = (name, returnType, parameter, body) => {
    var method = new Method();
    method.name = name;
    method.returnType = returnType;
    method.parameters.push(parameter);
    method.body = body;
    return method;
}

// build method
var make = R.converge(
    buildQueryMethod,
    [
        R.always('query'),
        observableReturnType,
        queryParameter,
        makeMethodBody
    ]
);

exports.make = make;