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
var returnType = R.pathOr(R.prop('responseType'), ['responseConverter', 'convertedType']);
var observableReturnType = R.compose(
    x => 'Observable<' + x + '>',
    returnType
);

//build parameter
var queryParameter = () => {
    var parameter = new Parameter();
    parameter.type = 'HashMap<string, object>';
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