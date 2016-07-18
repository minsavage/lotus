/**
 * Created by danney on 16/7/4.
 */
var R = require('ramda');
var mustache = require('mustache');
var common = require('./common');
var parametersConfigGrouped = common.parametersConfigGrouped;
var mergeTwo = common.mergeTwo;
var mergeThree = common.mergeThree;
var trace = common.trace;

// build parameters
var pathParameter = R.prop('name');
var pathParameters = R.compose(R.map(pathParameter), R.prop('path'));
var bodyParameter = R.always('parameters');
var queryMapParameter = R.always('parameters');

var pathParametersIfExist = R.ifElse(R.has('path'), pathParameters, R.always(null));
var bodyParametersIfExist = R.ifElse(R.has('json'), bodyParameter, R.always(null));
var queryParametersIfExist = R.ifElse(R.has('queryMap'), queryMapParameter, R.always(null));

var methodParameters = R.converge(
    mergeThree,
    [pathParametersIfExist, bodyParametersIfExist, queryParametersIfExist]
);

var filterable = R.compose(R.not, R.isNil);

var makeMethodCallArguments = R.compose(
    R.join(', '),
    R.filter(filterable),
    methodParameters,
    parametersConfigGrouped
);

// build code for init parameter which would be pass to service calling
var pathParameterInit = function(parameter) {
    var tpl = 'var {{name}} = parameters.get(\'{{name}}\', \'{{type}}\');\r parameters.remove(\'{{name}}\');'
    return mustache.render(tpl, {
        name: parameter.name,
        type: parameter.type
    });
}

var pathParametersInit = R.compose(R.join('\r\r'), R.map(pathParameterInit), R.prop('path'));
var pathParametersInitIfExist = R.ifElse(R.has('path'), pathParametersInit, R.always(''));
var initParameter = R.compose(pathParametersInitIfExist, parametersConfigGrouped);

//build code for call query service
var renderServiceCallingCode = function (args, responseConverter) {
    /*
        var service = RemoteOperatorServiceUtil.getService();
        return service.querQueryPost(param).map(x=>x.content);
    */
    var tpl = 'native(\'{{code}}\', \'{{returnType}}\')\r';
    var codeROSU = 'RemoteOperatorServiceUtil.getService()';
    codeROSU = mustache.render(tpl, {code: codeROSU, returnType: 'RemoteOperatorService'});

    var code = 'var service = ' + codeROSU + 
               'return service.querQueryPost({{args}})';
    
    if(!R.isNil(responseConverter)) {
        code += '.' + responseConverter;
    }                    

    return mustache.render(code, {args: args});
}

var serviceCallingCode = R.converge(
    renderServiceCallingCode, 
    [makeMethodCallArguments, R.path(['responseConverter', 'actions']) ]
)

//final make
var makeBody = R.compose(
    R.join('\r\r'),
    R.converge(mergeTwo, [initParameter, serviceCallingCode])
);

exports.makeBody = makeBody;