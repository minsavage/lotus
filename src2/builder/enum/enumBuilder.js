/**
 * Created by danney on 16/4/2.
 */
var fs = require('fs');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, '../template'));
var mustache = require('mustache');
var projectConfig = lotus.projectConfig;

var EnumBuilder = function() {}

EnumBuilder.prototype.parse = function(model) {
    for(var className in model) {
        var items = model[className];

        var content = this._buildEnum(className, items);
        this._save(className, content);
    }
}

EnumBuilder.prototype._buildEnum = function(className, items) {
    var itemsStr = '';
    for(var k in items) {
        itemsStr += k + ', '
    }

    return mustache.render(tpl.common.enum, {
        packageName: projectConfig.getPackageName(),
        className: className,
        items: itemsStr
    })
}

EnumBuilder.prototype._save = function(className, content) {
    var filePath = path.resolve(projectConfig.getSrcDir(), 'enumeration', className + '.java');
    fs.writeFileSync(filePath, content);
}

module.exports = EnumBuilder;