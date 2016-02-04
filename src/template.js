/**
 * Created by danney on 16/1/19.
 */
var fs = require('fs');
var stringUtil = require('./util/stringUtil');

module.exports = function(path) {
    return load(path);
}

var load = function(dirPath) {
    var tpl = {};

    var contentList = fs.readdirSync(dirPath);
    for(var k in contentList) {
        var item = contentList[k];
        var filePath = dirPath + '/' + item;

        var content = null;

        if(fs.statSync(filePath).isDirectory()) {
            content = load(filePath);
        }
        else {
            if(filePath.indexOf('.js') < 0) {
                continue;
            }
            content = fs.readFileSync(filePath, 'utf-8');
        }

        item = stringUtil.withoutSuffix(item, '.js');

        tpl[item] = content;
    }

    return tpl;
}