/**
 * Created by danney on 15/9/5.
 */
var fs = require('fs');

var tpl = {
    xmlRoot: fs.readFileSync('../template/xmlRoot.js', 'utf-8'),
    type: fs.readFileSync('../template/type2.js', 'utf-8')
}

module.exports = tpl;