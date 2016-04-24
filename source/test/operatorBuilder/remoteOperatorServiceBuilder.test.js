/**
 * Created by danney on 16/4/23.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var lotus = require('../../src/lotus');
var stringUtil = lotus.util.stringUtil;

var muk = require('muk');
muk(lotus.projectConfig, 'getServerDomain', function(){
    return 'http://www.2go.cat/';
})

var RemoteOperatorServiceBuilder = require('../../src/builder/operator/remoteOperatorServiceBuilder');

describe('RemoteOperatorServiceBuilder', function () {
    describe('#parse', function () {
        it('custom url', function () {
            var filePath = path.resolve(__dirname, 'res/usersOperatorWithCustomUrl.java');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = stringUtil.removeAllWhiteSpaceCharacters(expectedResult);

            var model = require('./res/usersOperatorWithCustomUrl');
            var builder = new RemoteOperatorServiceBuilder();
            var ret = builder.parse([model]);
            ret = stringUtil.removeAllWhiteSpaceCharacters(ret);

            expect(ret).to.equal(expectedResult);
        })

        it('post method with json type', function () {
            var filePath = path.resolve(__dirname, 'res/postMethodWithJsonType.java');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = stringUtil.removeAllWhiteSpaceCharacters(expectedResult);

            var model = require('./res/postMethodWithJsonType');
            var builder = new RemoteOperatorServiceBuilder();
            var ret = builder.parse([model]);
            ret = stringUtil.removeAllWhiteSpaceCharacters(ret);

            expect(ret).to.equal(expectedResult);
        })
        
        it('post method with formUrlEncode type', function () {
            //fs.writeFileSync('test.java', ret);
            
        })
    })
})