/**
 * Created by danney on 16/1/15.
 */
'use strict';
var RemoteOperatorBuilder = require('./remoteOperatorBuilder');

class OperatorBuilder {
    parse(operator) {
        if(operator.type == 'remote') {
            var builder = new RemoteOperatorBuilder();
            return builder.parse(operator);
        }
        else {
            throw 'not support operator type:' + operator.type;
        }
    }
}

module.exports = OperatorBuilder;