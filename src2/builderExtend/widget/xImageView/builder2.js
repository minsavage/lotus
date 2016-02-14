/**
 * Created by danney on 16/2/13.
 */
var util = require('util');
var lotus = require('../../../lotus')
var mustache = require('mustache');
var codeGenerateUtil = lotus.util.codeGenerateUtil;
var WidgetBuilder = lotus.builderMgr.queryWidgetBuilder();

var XImageViewBuilder = function() {
    WidgetBuilder.call(this);
};

util.inherits(XImageViewBuilder, WidgetBuilder);

//XImageViewBuilder.prototype.parse = function() {
//
//}

XImageViewBuilder.prototype._buildAssignment = function(key, value, model) {
    if(key != 'uri') {
        XImageViewBuilder.super_.prototype._buildAssignment.call(this, key, value, model);
        return;
    }

    var array = value.split('.');
    var obj = array[0];
    var property = array[1];

    var getter = codeGenerateUtil.generateGetterCall(obj, property);
    getter = getter.substr(0, getter.length-1);

    var objName = 'viewHolder.' + model.id;



    var strTpl = '{{obj}}.setImageURI(Uri.parse({{value}}));'

    var code = mustache.render(strTpl, {
        obj: objName,
        value: getter
    })

    this._codeRecorder.addAssignment(code);
    this._codeRecorder.getImportRecorder().addPlain('android.net.Uri');
}

module.exports = XImageViewBuilder;