/**
 * Created by danney on 16/1/17.
 */
'use strict';

var util = require('util');

class ImportRecorder {
    constructor() {
        this.container = {}
    }

    add(item) {
        if(util.isNullOrUndefined(item)) {
            return;
        }

        if(util.isString(item)) {
            this.container[item] = true;
        }
        else if(util.isArray(item)) {
            for(var k in item) {
                var i = item[k];
                if(util.isString(i)) {
                    this.container[i] = true;
                }
            }
        }
        else if(item instanceof ImportRecorder) {
            for(var k in item.container) {
                this.container[k] = true;
            }
        }
        else {
            throw 'import: do not support item, ' + item
        }
    }

    generate() {
        var result = '';
        for(var item in this.container) {
            var ret = this.toNative(item);
            result += 'import ' + ret + ';\r';
        }
        return result.trim();
    }

    toNative(item) {
        var projectConfig = require('../lotus').projectConfig;

        var regModel = /^\$\.(model|operator|viewModel|viewController|base)\.(\w+)$/g;
        var regSystemType = /^system\.type\.(\w+)$/g;
        if(regModel.test(item)) {
            return projectConfig.getPackageName() + '.' + RegExp.$1 + '.' + RegExp.$2;
        }
        else if(regSystemType.test(item)) {
            var type = RegExp.$1;
            if(type == 'Array') {
                return 'java.util.ArrayList'
            }
            else {
                return item;
            }
        }
        else {
            item = item.replace('$', projectConfig.getPackageName());
            return item;
        }
    }
}

module.exports = ImportRecorder;