/**
 * Created by danney on 16/1/19.
 */
var util = require('util');
var mustache = require('mustache');
var lotus = require('../../lotus');
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var CodeRecorder = lotus.recorder.CodeRecorder;
var FunctionBuilder = require('../function/functionBuilder');
var BaseBuilder = require('../baseBuilder');

class WidgetBuilder extends BaseBuilder{
    constructor() {
        super();
        this.codeRecorder = new CodeRecorder();
        this.className = '';
        this.buildConfig = null;
    }

    parse(model, buildConfig) {
        super.parse(model);
        this.buildConfig = buildConfig;

        if(!this.canParse()) {
            return null;
        }

        if(!util.isNullOrUndefined(this.buildConfig.name)) {
            this.className = buildConfig.name;
        }
        else {
            this.className = model.type;
        }

        this._buildMemberVariable();
        this._buildOnCreate();
        this._buildOnCreateView();
        this._buildOnDestroy();
        this._buildEvent();
        this._buildImport();

        return this.codeRecorder;
    }

    check(model) {}

    canParse() {
        if(util.isNullOrUndefined(this.buildConfig) ||
            util.isNullOrUndefined(this.model.event)) {
            return false;
        }
        else {
            return true;
        }
    }

    _buildMemberVariable() {
        console.log('parsing...2');
        var code = codeGenerateUtil.generateVariableDeclare(this.className, this.model.id);
        this.codeRecorder.addMemberVariable(code);
        console.log('parsing...4');
        console.log(code);
    }

    _buildOnCreate() {
        if(!util.isNullOrUndefined(this.buildConfig) &&
            !util.isNullOrUndefined(this.buildConfig.onCreate)) {
            this.codeRecorder.addOnCreate(this.buildConfig.onCreate);
        }
    }

    _buildOnCreateView() {
        var code = codeGenerateUtil.generateFindViewById(this.className, this.model.id, 'view', this.model.id) + '\r';
        this.codeRecorder.addOnCreateView(code);
    }

    _buildOnDestroy() {
        this.codeRecorder.addOnDestroy(this.model.id + ' = null;');
    }

    _buildEvent() {
        if(util.isNullOrUndefined(this.model.event) ||
            util.isNullOrUndefined(this.buildConfig.event)) {
            return;
        }

        var events = this.model.event;
        for(var name in events) {
            var action = events[name];
            var config = this.buildConfig.event[name];
            if(util.isNullOrUndefined(config)) {
                continue;
            }

            var content = '';
            var functionBuilder = new FunctionBuilder();
            var result = functionBuilder.parse(action);
            content = result.code;
            this.importRecorder.add(result.import);

            var listenerName = this.model.id + config.name;

            var eventInit = mustache.render(config.init, {
                objName: this.model.id,
                listenerName:listenerName
            });

            var eventImpl = mustache.render(config.impl, {
                listenerName:listenerName,
                content: content
            });

            this.codeRecorder.addOnCreateView(eventInit);
            this.codeRecorder.addEventImpl(eventImpl);
        }
    }

    _buildImport(model, buildConfig) {
        if(!util.isNullOrUndefined(this.buildConfig) && !util.isNullOrUndefined(this.buildConfig.import)) {
            this.importRecorder.add(this.buildConfig.import);
            this.codeRecorder.addImport(this.importRecorder);
        }
    }
}

module.exports = WidgetBuilder;