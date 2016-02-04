/**
 * Created by danney on 15/12/5.
 */
var nameUtil = require('../../javaNameUtil');
var DataBindingBuilder = function() {}

DataBindingBuilder.prototype.parse = function(model) {
    var codeFragment = new CodeFragment();

    codeFragment.addImport(this._buildImport(model));
    codeFragment.addVariableStatment(this._buildVariableStatement(model));
    codeFragment.addOnCreateInit(this._buildInit(model));

    var buildEventResult = this._buildEvent(model);
    if(buildEventResult != null) {
        codeFragment.addOnCreateInit(buildEventResult.init);
        codeFragment.addEvent(buildEventResult.impl);
    }

    return codeFragment;
}

DataBindingBuilder.prototype._buildImport = function(model) {
    var className = getBindingClassName(model.name);
    return 'com.example.danney.mvvmtest' + '.databinding.' + className;
}

DataBindingBuilder.prototype._buildVariableStatement = function(model) {
    return mustache.render(tpl.viewController.memberVariableStmt, {
        className: getBindingClassName(model.name),
        objName: model.id
    });

    var className = ;
    return className
    return 'com.example.danney.mvvmtest' + '.databinding.' + className;
}




function getBindingClassName(viewControllName) {
    var className = nameUtil.formatClassName(viewControllName.toLowerCase()) + 'Binding';
}

module.exports = DataBindingBuilder;