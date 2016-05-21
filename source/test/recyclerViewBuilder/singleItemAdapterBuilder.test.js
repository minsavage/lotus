/**
 * Created by danney on 16/5/18.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var lotus = require('../../src/lotus');
var stringUtil = lotus.util.stringUtil;
var builderMgr = lotus.builderMgr;
var muk = require('muk');

describe('SingleItemAdapterBuilder', function () {
    describe('#parse', function(){
        var builder = null;
        var config = builderMgr.queryWidgetBuildConfig('RecyclerView');

        before(function () {
            var SingleItemAdapterBuilder = require('../../src/builderExtend/widget/recyclerView/singleItemAdapterBuilder');
            builder = new SingleItemAdapterBuilder();
        })

        it('should parse model success', function () {
            var filePath = path.resolve(__dirname, 'res/singleItemAdapter.java');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = stringUtil.removeAllWhiteSpaceCharacters(expectedResult);

            var model = require('./res/model');
            var ret = builder.parse(model);
            ret = stringUtil.removeAllWhiteSpaceCharacters(ret);

            expect(ret).to.equal(expectedResult);
        })
    });
});