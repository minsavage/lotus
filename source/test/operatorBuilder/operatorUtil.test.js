/**
 * Created by danney on 16/6/12.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var lotus = require('../../src/lotus');
var stringUtil = lotus.util.stringUtil;
var OperatorUtil = require('../../src/builder/operator/OperatorUtil');

describe('OperatorUtil', function () {
    describe('#generateMethod', function () {
        it('generateMethod success', function () {
            var filePath = path.resolve(__dirname, 'res/generateMethod.result');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = stringUtil.removeAllWhiteSpaceCharacters(expectedResult);

            var model = require('./res/postOperator');
            var actionModel = model.action.query;
            var ret = OperatorUtil.generateMethod(actionModel);
            ret = JSON.stringify(ret);
            ret = stringUtil.removeAllWhiteSpaceCharacters(ret);

            expect(ret).to.equal(expectedResult);
        })
    })

    describe('#generateMethodCode', function () {
        it('generateMethodCode success', function () {
            var model = require('./res/postOperator');
            var actionModel = model.action.query;
            var methodModel = OperatorUtil.generateMethod(actionModel);

            //call
            var ret = OperatorUtil.generateMethodCode(methodModel);

            var filePath = path.resolve(__dirname, 'res/generateMethodCode.result');
            var expectedResult = fs.readFileSync(filePath, 'utf8');

            expect(ret).to.equal(expectedResult);
        })
    })
})