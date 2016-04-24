/**
 * Created by danney on 16/4/24.
 */
'use strict'
var util = require('util');
var path = require('path');
var mustache = require('mustache');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var stringUtil = lotus.util.stringUtil;
var nameUtil = lotus.util.nameUtil;
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var projectConfig = lotus.projectConfig;
var BaseBuilder = require('../baseBuilder')

class RemoteOperatorBuilder extends BaseBuilder{
    parse(model) {
        super.parse(model);

        var content = '';

        if(!util.isNullOrUndefined(model.action) &&
            !util.isNullOrUndefined(model.action.query)) {
            content += this.buildQuery(model);
        }

        this.addImport();

        return codeGenerateUtil.generateClass(projectConfig.getPackageName(),
            'operator',
            this.importRecorder.generate(),
            model.name,
            content);
    }

    buildQuery(model) {
        var query = model.action.query;

        var resultClassName = nameUtil.getOperatorQueryResultClassName(model.operatedModel, query.resultType);
        var resourceObjName = nameUtil.getOperatorQueryResultObjectName(model.operatedModel, query.resultType);

        if(query.resultType == 'collection') {
            this.importRecorder.add('$.base.Collection');
        }

        return mustache.render(tpl.modelOperator.remoteQuery, {
            url: projectConfig.getServerDomain(),
            resultClassName: resultClassName,
            resultObjectName: resourceObjName,
            queryFuncName: nameUtil.getOperatorFunctionName('query', model.operatedModel, query.resultType)
        });
    }

    addImport() {
        this.importRecorder.add([
            '$.base.Callback',
            '$.base.GsonConverterUtil',
            '$.operator.RemoteOperatorService',
            'android.util.Log',
            'java.util.Map',
            'retrofit.Call',
            'retrofit.Response',
            'retrofit.Retrofit'
        ])
    }
}

module.exports = RemoteOperatorBuilder;