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
var modelMgr = lotus.modelMgr;
var muk = require('muk');


muk(modelMgr, 'queryViewController', function(name){
    return require('./res/itemViewController');
})

describe('ViewHolderBuilder', function () {
    describe('#parse', function(){
        var builder = null;

        before(function () {
            var ViewHolderBuilder = require('../../src/builderExtend/widget/recyclerView/viewHolderBuilder');
            builder = new ViewHolderBuilder();
        })

        it('should parse model success', function () {
            var filePath = path.resolve(__dirname, 'res/singleItemAdapter.java');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = stringUtil.removeAllWhiteSpaceCharacters(expectedResult);

            var model = require('./res/model');
            var ret = builder.parse(model);
            //fs.writeFileSync('test2.java', ret);
            ret = stringUtil.removeAllWhiteSpaceCharacters(ret);

            expect(ret).to.equal(expectedResult);
        })
    });
});