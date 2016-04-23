/**
 * Created by danney on 16/2/16.
 */
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var util = require('util');
var nameUtil = lotus.util.nameUtil;
var projectConfig = lotus.projectConfig;

var ServerBootBuilder = function () {
    this._pathBinding = '';
    this._import = '';
}

ServerBootBuilder.prototype.parse = function (operators) {
    for (var k in operators) {
        var operator = operators[k];
        if (util.isNullOrUndefined(operator.action) || operator.accessType != 'remote') {
            continue;
        }

        var actions = operator.action;
        var pathName = nameUtil.operatorToServerPathName(operator);

        for (var name in actions) {
            if (name == 'query') {
                var functionName = nameUtil.operatorToServerFunctionName(operator, name);
                var path = '/' + pathName;
                var handler = pathName + '.' + functionName;

                this._pathBinding += mustache.render(tpl.boot.pathBinding, {
                        path: path,
                        handler: handler
                    }) + '\r';
            }
        }

        this._import += mustache.render(tpl.boot.import, {pathName: pathName}) + '\r';
    }

    var serverConfig = projectConfig.get('server');

    return mustache.render(tpl.boot.main, {
        import: this._import,
        pathBinding: this._pathBinding,
        dbServerDomain: serverConfig.dbDomain,
        dbPort: serverConfig.dbPort,
        dbName: serverConfig.dbName,
        serverPort: serverConfig.port
    })
}

module.exports = ServerBootBuilder;