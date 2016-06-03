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
var FunctionBuilder = require('../function/functionBuilder');

class RemoteOperatorBuilder extends BaseBuilder{
    parse(model) {
        console.log('parsing... ' + model.name);
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
        var responseType = query.responseType;
        var responseName = nameUtil.getNameByType(responseType);
        var convertedType = '';
        var convertedName = '';
        var converterCode = '';

        if(!util.isNullOrUndefined(query.responseConverter) &&
            !util.isNullOrUndefined(query.responseConverter.convertedType)) {
            convertedType = query.responseConverter.convertedType;
            convertedName = nameUtil.getNameByType(convertedType);
            converterCode = this.buildConverter(query.responseConverter);
        }

        if(stringUtil.isNotEmpty(convertedType)) {
            responseType = convertedType;
        }

        return mustache.render(tpl.modelOperator.remoteQuery, {
            url: projectConfig.getServerDomain(),
            resultClassName: responseType,
            queryFuncName: nameUtil.getOperatorFunctionName('query', model.operatedModel),
            converter: converterCode
        });
    }

    buildConverter(converterModel) {
        var action = converterModel.actions[0];
        var op = action.op;
        var ret = this.buildAction(action.action);

        var template = '.map({{input}} -> {\r{{code}} })';
        var converter = mustache.render(template, {
            input: ret.parameters[0],
            code: ret.code
        });

        this.importRecorder.add(ret.import);
        return converter.trim();
    }

    buildAction(action) {
        if(!util.isFunction(action)) {
            return null;
        }

        var functionBuilder = new FunctionBuilder();
        return functionBuilder.parse(action);
    }

    addImport() {
        this.importRecorder.add([
            '$.base.GsonConverterUtil',
            'android.util.Log',
            'java.util.Map',
            'retrofit.Call',
            'retrofit.Response',
            'retrofit.Retrofit',
            'retrofit.RxJavaCallAdapterFactory',
            'rx.Observable',
            'rx.android.schedulers.AndroidSchedulers',
            'rx.schedulers.Schedulers'
        ])
    }
}

module.exports = RemoteOperatorBuilder;