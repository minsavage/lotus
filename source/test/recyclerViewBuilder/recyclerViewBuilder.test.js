/**
 * Created by zouqin on 16/5/10.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var lotus = require('../../src/lotus');
var stringUtil = lotus.util.stringUtil;

var muk = require('muk');
// muk(lotus.projectConfig, 'getPackageName', function(){
//     return 'com.lotus.tn';
// })
//
// muk(lotus.modelMgr, 'queryOperator', function(name){
//     if(name == 'UserOperator') {
//         return require('./res/userOperator');
//     }
//     else if(name == 'UsersOperator') {
//         return require('./res/usersOperator');
//     }
//     else {
//         return null;
//     }
// })

var RecyclerViewBuilder = builderMgr.queryWidgetBuilder('RecyclerView');
//var config = builderMgr.queryWidgetBuildConfig('RecyclerView');

describe('RecyclerViewBuilder', function () {
    describe('#parse', function(){
        it('should parse view model success', function () {
            var filePath = path.resolve(__dirname, 'res/userViewModel.java');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = stringUtil.removeAllWhiteSpaceCharacters(expectedResult);

            var model = require('./res/model');

            var builder = new RecyclerViewBuilder();
            var codeRecorder = builder.parse(model, null);
            
            var ret = codeRecorder.toString();
            fs.writeFile('test.java', ret);
            ret = stringUtil.removeAllWhiteSpaceCharacters(ret);

            expect(ret).to.equal(expectedResult);
        })
    });
});