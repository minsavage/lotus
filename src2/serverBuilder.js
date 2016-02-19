/**
 * Created by danney on 16/2/15.
 */
var fs = require('fs');
var lotus = require('./lotus');
var path = require('path');
var modelMgr = lotus.modelMgr;
var builderMgr = lotus.builderMgr;
var projectConfig = lotus.projectConfig;
var mkdirp = require('mkdirp');
var stringUtil = lotus.util.stringUtil;
var nameUtil = lotus.util.nameUtil;

var CRUDBuilder = require('./builder/server/crudBuilder');
var ServerBootBuilder = require('./builder/server/serverBootBuilder');
var DataBaseBuilder = require('./builder/server/dbBuilder');

var startBuild = function() {
    var operators = modelMgr.getOperators();
    for(var k in operators) {
        var operator = operators[k];

        var builder = new CRUDBuilder();
        var content = builder.parse(operator);

        fileName = nameUtil.operatorToServerPathName(operator) + '.js';
        var p = path.join(projectConfig.getServerDir(), fileName);
        saveFile(p, content);
    }

    var serverBootBuilder = new ServerBootBuilder();
    var content = serverBootBuilder.parse(operators);
    var p = path.join(projectConfig.getServerDir(), 'index.js');
    saveFile(p, content);

    var dbBuilder = new DataBaseBuilder();
    var content = dbBuilder.parse();
    var p = path.join(projectConfig.getServerDir(), 'db.js');
    saveFile(p, content);
}

var saveFile = function(filePath, content) {
    var dirname = path.dirname(filePath);
    if(!fs.existsSync(dirname)) {
        mkdirp(dirname, function(){
            fs.writeFileSync(filePath, content);
        })
    }
    else {
        fs.writeFileSync(filePath, content);
    }
}

exports.startBuild = startBuild;