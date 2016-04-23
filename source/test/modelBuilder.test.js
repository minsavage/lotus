/**
 * Created by danney on 16/4/23.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var lotus = require('../src/lotus');

var muk = require('muk');
muk(lotus.projectConfig, 'getPackageName', function(){
    return 'com.lotus.tn';
})

var ModelBuilder = require('../src/builder/model/modelBuilder');

describe('ModelBuilder', function () {
    describe('#parse', function(){
        var modelBuilder,
            model,
            expectedResult;

        before(function () {
            modelBuilder = new ModelBuilder();
        })

        it('should parse model success', function () {
            var filePath = path.resolve(__dirname, 'res/user.java');
            expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = expectedResult.replace(/\s+/g, '');

            model = require('./res/user');
            var ret = modelBuilder.parse(model);
            ret = ret.replace(/\s+/g, '');
            expect(ret).to.equal(expectedResult);
        })

        it('should parse model success with import ArrayList', function () {
            var filePath = path.resolve(__dirname, 'res/userModelWithArray.java');
            expectedResult = fs.readFileSync(filePath, 'utf8');
            expectedResult = expectedResult.replace(/\s+/g, '');

            model = require('./res/userModelWithArray');
            var ret = modelBuilder.parse(model);
            ret = ret.replace(/\s+/g, '');
            expect(ret).to.equal(expectedResult);
        })
    });
});