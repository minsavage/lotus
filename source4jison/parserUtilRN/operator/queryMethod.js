/**
 * Created by danney on 16/7/4.
 */
var R = require('ramda');
var Method = require('../../type/method');
var Parameter = require('../../type/parameter');
var common = require('./common');
var makeMethodBody = require('./methodBody').makeBody;
var mergeThree = common.mergeThree;
var parametersConfigGrouped = common.parametersConfigGrouped;

//build return type
var returnType = R.pathOr(R.prop('responseType'), ['responseConverter', 'convertedType']);
var observableReturnType = R.compose(
    x => 'Observable<' + x + '>',
    returnType
);

//build parameter
var queryParameter = () => {
    return Parameter.create('HashMap<string, object>', 'parameters');
};

var buildQueryMethod = (name, returnType, parameter, body) => {
    return Method.create(name, returnType, [parameter], body, ['public']);
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