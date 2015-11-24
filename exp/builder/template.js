/**
 * Created by danney on 15/9/5.
 */
var fs = require('fs');

var tpl = {
    type: fs.readFileSync('../template/type.js', 'utf-8')
}

module.exports = tpl;