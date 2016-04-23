/**
 * Created by danney on 16/1/19.
 */
var checkIsDataBinding = function(value) {
    var start = value.indexOf('@{');
    var end = value.indexOf('}');
    if(start == 0 && end == value.length-1) {
        return true;
    }
    else {
        return false;
    }
}

var getPlainValue = function(str) {
    var start = str.indexOf('@{');
    var end = str.indexOf('}');
    if(start == 0 && end == str.length-1) {
        return str.substring(start + 2, end);
    }
    else {
        return str;
    }
}

exports.checkIsDataBinding = checkIsDataBinding;
exports.getPlainValue = getPlainValue;