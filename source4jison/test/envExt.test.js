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


describe('EnvExt', function () {
    describe('#find()', function(){
        var classLoader = require('../type/classLoader');
        var realLoad = classLoader.load;

        before(function() {
            muk(classLoader, 'load', function(){
                return 'ok';
            })
        });

        after(function() {
            muk(classLoader, 'load', realLoad);
        });

        it('find type success in local scope', function () {
            var env = prepareEnv();
            var name = 'person';

            var ret = envExt.find(env, name);

            var expectedResult = 'ok';
            expect(ret).to.equal(expectedResult);
        })

        //it('getter, like: \'user.address.home\'', function () {
        //    var ast = genAst('user.address.home');
        //
        //    var ret = translate([], ast);
        //
        //    var expectedResult = [
        //        'user.getAddress().getHome()',
        //        'string'
        //    ];
        //
        //    expect(ret).to.deep.equal(expectedResult);
        //})
    });
});