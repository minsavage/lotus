/**
 * Created by danney on 16/2/16.
 */
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var projectConfig = lotus.projectConfig;

var DataBaseBuilder = function() {};

DataBaseBuilder.prototype.parse = function() {
    var serverConfig = projectConfig.get('server');

    return mustache.render(tpl.db.main, {
        dbServerDomain: serverConfig.dbDomain,
        dbPort: serverConfig.dbPort,
        dbName: serverConfig.dbName
    })
}

module.exports = DataBaseBuilder;