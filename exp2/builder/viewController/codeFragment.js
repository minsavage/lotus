/**
 * Created by danney on 15/12/5.
 */
var CodeFragment = function() {
    this._fragments = {
        variableStatment: '',
        onCreateBeforeInflate: '',
        onCreateAfterInflate: '',
        onCreateInit: '',
        onDestroy: '',
        event: '',
        other: '',
        import: '',
        propertyBinding: {}
    }
}

CodeFragment.prototype._fragments;

CodeFragment.prototype.addVariableStatment = function(fragment) {
    this._fragments.variableStatment += fragment;
}

CodeFragment.prototype.addOnCreateBeforeInflate = function(fragment) {
    this._fragments.onCreateBeforeInflate += fragment;
}

CodeFragment.prototype.addOnCreateAfterInflate = function(fragment) {
    this._fragments.onCreateAfterInflate += fragment;
}

CodeFragment.prototype.addOnCreateInit = function(fragment) {
    this._fragments.onCreateInit += fragment;
}

CodeFragment.prototype.addOnDestroy = function(fragment) {
    this._fragments.onDestroy += fragment;
}

CodeFragment.prototype.addEvent = function(fragment) {
    this._fragments.event += fragment;
}

CodeFragment.prototype.addOther = function(fragment) {
    this._fragments.other += fragment;
}

CodeFragment.prototype.addImport = function(fragment) {
    this._fragments.import += fragment;
}

CodeFragment.prototype.addPropertyBinding = function(propertyName, fragment) {
    this._fragments.propertyBinding[propertyName] = fragment;
}

module.exports = CodeFragment;