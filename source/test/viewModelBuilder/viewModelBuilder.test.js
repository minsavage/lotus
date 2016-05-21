/**
 * Created by danney on 16/4/24.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var lotus = require('../../src/lotus');
var stringUtil = lotus.util.stringUtil;

var muk = require('muk');
muk(lotus.projectConfig, 'getPackageName', function(){
    return 'com.lotus.tn';
})

muk(lotus.modelMgr, 'queryOperator', function(name){
    if(name == 'UserOperator') {
        return require('./res/userOperator');
    }
    else if(name == 'UsersOperator') {
        return require('./res/usersOperator');
    }
    else {
        return null;
    }
})

var FunctionBuilder = require('../../src/builder/function/functionBuilder');
muk(FunctionBuilder.prototype, 'parse', function () {
    return {
        code: '',
        parameters: ['user'],
        import: []
    }
})

var ViewModelBuilder = require('../../src/builder/viewModel/viewModelBuilder');

describe('ViewModelBuilder', function () {
    describe('#parse', function(){
        it('should parse view model success', function () {
            var filePath = path.resolve(__dirname, 'res/userViewModel.java');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = stringUtil.removeAllWhiteSpaceCharacters(expectedResult);

            var model = require('./res/userViewModel');
            var builder = new ViewModelBuilder();
            var ret = builder.parse(model);
            ret = stringUtil.removeAllWhiteSpaceCharacters(ret);

            expect(ret).to.equal(expectedResult);
        })
    });
});