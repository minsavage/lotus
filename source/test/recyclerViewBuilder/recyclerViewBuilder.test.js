/**
 * Created by zouqin on 16/5/10.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var lotus = require('../../src/lotus');
var stringUtil = lotus.util.stringUtil;
var builderMgr = lotus.builderMgr;
var muk = require('muk');

 muk(builderMgr, 'queryWidgetBuilder', function(name){
     if(name == 'RecyclerView') {
         return require('../../src/builderExtend/widget/recyclerView/widgetBuilder');
     }
     else {
         return require('../../src/builder/widget/widgetBuilder2');
     }
 })

muk(builderMgr, 'queryWidgetBuildConfig', function(name){
    if(name == 'RecyclerView') {
        return require('../../src/builderExtend/widget/recyclerView/widgetBuildConfig');
    }
    else {
        return null;
    }
})

describe('RecyclerViewBuilder', function () {
    describe('#parse', function(){
        var builder = null;
        var config = builderMgr.queryWidgetBuildConfig('RecyclerView');

        before(function () {
            var RecyclerViewBuilder = builderMgr.queryWidgetBuilder('RecyclerView');
            builder = new RecyclerViewBuilder();

            muk(builder, '_buildAdapter', function(name){
                this.codeRecorder.addEventImpl('\r##Adapter##\r');
            })

            muk(builder, '_buildViewHolder', function(name){
                this.codeRecorder.addEventImpl('\r##ViewHolder##\r');
            })
        })

        it('should parse model success', function () {
            var filePath = path.resolve(__dirname, 'res/model.java');
            var expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = stringUtil.removeAllWhiteSpaceCharacters(expectedResult);

            var model = require('./res/model');
            var codeRecorder = builder.parse(model, config);
            
            var ret = codeRecorder.toString();
            ret = stringUtil.removeAllWhiteSpaceCharacters(ret);

            expect(ret).to.equal(expectedResult);
        })
    });
});