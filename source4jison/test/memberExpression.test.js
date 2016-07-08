/**
 * Created by danney on 16/4/24.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var muk = require('muk');
var envExt = require('../translator/envExt');
var codeGenUtil = require('../util/codeGenUtil');

var javaClassTranslator = require('../translator/javaClassTranslator');
muk(javaClassTranslator, 'translateFiled', function(objType, objName, fieldName){
    return [
        codeGenUtil.genGetterCall(objName, fieldName),
        'string'
    ]
})

var translatorMgr = require('../translator/translatorMgr');
muk(translatorMgr, 'find', function(name){
    return {
        translate: function () {
            return [
                'user.getAddress()',
                'string'
            ]
        }
    }
})

var mockFind = function () {
    var Class = require('../type/class');
    var personClass = new Class();
    personClass.name = 'Person';
    return personClass;
}

var genAst = function (code) {
    var esprima = require('esprima');
    var ast = esprima.parse(code);
    return ast.body[0].expression;
}


describe('MemberExpression', function () {
    describe('#translate()', function(){
        var realFind = envExt.find;

        before(function() {
            muk(envExt, 'find', mockFind);
        });

        after(function() {
            muk(envExt, 'find', realFind);
        });

        var translate = require('../translator/memberExpression').translate;

        it('getter, like: \'user.name\'', function () {
            var ast = genAst('user.name');

            var ret = translate([], ast);

            var expectedResult = [
                'user.getName()',
                'string'
            ];

            expect(ret).to.deep.equal(expectedResult);
        })

        it('getter, like: \'user.address.home\'', function () {
            var ast = genAst('user.address.home');

            var ret = translate([], ast);

            var expectedResult = [
                'user.getAddress().getHome()',
                'string'
            ];

            expect(ret).to.deep.equal(expectedResult);
        })
    });
});