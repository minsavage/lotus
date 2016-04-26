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
        var projectConfig = require('../lotus').projectConfig;

        var result = '';
        for(var item in this.container) {
            if(item.indexOf('$.') == 0) {
                item = item.replace('$', projectConfig.getPackageName);
            }
            result += 'import ' + item + ';\r';
        }
        return result.trim();
    }
}

module.exports = ImportRecorder;