/**
 * Created by danney on 16/4/24.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var muk = require('muk');
var envExt = require('../translator/envExt');
var createEnv = envExt.createEnv;
var addEnv = envExt.add;
var codeGenUtil = require('../util/codeGenUtil');
var Class = require('../type/class');
var classLoader = require('../type/classLoader');

var prepareEnv = function () {
    var testClass = new Class();
    testClass.name = 'TestClass';
    testClass.import.push('$.model.Person');

    var personClass = new Class();
    personClass.name = 'Person';
    var env = createEnv(testClass);
    env = addEnv(env, [{
        name: 'person',
        type: 'Person'
    }])
    return env;
}

var prepareModelsContainer = function () {
    var container = {};

    var test1 = new Class();
    var test2 = new Class();
    var test3 = new Class();
    var test4 = new Class();

    test1.name = 'Test1';
    test2.name = 'Test2';
    test3.name = 'Test3';
    test4.name = 'Test4';

    container.model = [test1, test2];
    container.operator = [test3, test4];

    return container;
}


describe('ClassLoader', function () {
    describe('#load()', function(){
        classLoader.init(prepareModelsContainer());

        it('load class success by full type in models container', function () {
            var fullType = '$.operator.Test3';
            var ret = classLoader.load(fullType)

            var expectedResult = new Class();
            expectedResult.name = 'Test3';

            expect(ret).to.deep.equal(expectedResult);
        })

        it('load class failed by full type in models container', function () {
            var fullType = '$.operator.Test5';
            var ret = classLoader.load(fullType)
            expect(ret).to.equal(null);
        })

        it('load class failed by full type with error model type', function () {
            var fullType = '$.NotExisted.Test5';
            var ret = classLoader.load(fullType)
            expect(ret).to.equal(null);
        })

        it('load class success by full type in file', function () {
            var fullType = 'system.type.Array';
            var ret = classLoader.load(fullType)

            var expectedResult = new Class();
            expectedResult.name = 'Array';

            expect(ret).to.deep.equal(expectedResult);
        })
    });
});