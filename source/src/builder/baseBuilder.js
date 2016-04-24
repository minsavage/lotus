/**
 * Created by danney on 16/4/23.
 */
"use strict";
var lotus = require('../lotus');
var ImportRecorder = lotus.recorder.ImportRecorder;
var importUtil = lotus.util.importUtil;

class BaseBuilder {
    constructor() {
        this.importRecorder = new ImportRecorder();
        this.model = null;
    }

    parse(model) {
        this.check(model);
        this.model = model;
        this.importRecorder.add(model.import);
    }

    check(model) {
        if(model.name == undefined || model.name == null) {
            throw 'model.name == null';
        }
    }
}

module.exports = BaseBuilder;