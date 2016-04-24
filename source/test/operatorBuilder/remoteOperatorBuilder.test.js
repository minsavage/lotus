/**
 * Created by danney on 16/4/23.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var lotus = require('../../src/lotus');

var muk = require('muk');
muk(lotus.projectConfig, 'getServerDomain', function(){
    return 'http://www.2go.cat/';
})

var RemoteOperatorBuilder = require('../../src/builder/operator/remoteOperatorBuilder');

describe('RemoteOperatorBuilder', function () {
    describe('#buildQuery', function () {
        it('result type == object', function () {
            var filePath = path.resolve(__dirname, 'res/userOperatorWithQueryUser.java');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = expectedResult.replace(/\s+/g, '');

            var model = require('./res/userOperator');
            var builder = new RemoteOperatorBuilder();
            var ret = builder.buildQuery(model);
            ret = ret.replace(/\s+/g, '');

            expect(ret).to.equal(expectedResult);
        })

        it('result type == collection', function () {
            var filePath = path.resolve(__dirname, 'res/usersOperatorWithQueryUserList.java');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = expectedResult.replace(/\s+/g, '');

            var model = require('./res/usersOperator');
            var builder = new RemoteOperatorBuilder();
            var ret = builder.buildQuery(model);
            ret = ret.replace(/\s+/g, '');

            expect(ret).to.equal(expectedResult);
        })
    })
    
    describe('#parse', function () {
        it('parse operator model success', function () {
            var filePath = path.resolve(__dirname, 'res/usersOperator.java');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = expectedResult.replace(/\s+/g, '');

            var model = require('./res/usersOperator');
            var builder = new RemoteOperatorBuilder();
            var ret = builder.parse(model);
            ret = ret.replace(/\s+/g, '');

            expect(ret).to.equal(expectedResult);
        })
    })
})