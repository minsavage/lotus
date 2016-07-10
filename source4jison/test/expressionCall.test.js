/**
 * Created by danney on 16/4/24.
 */
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var muk = require('muk');
var envExt = require('../translator/envExt');

var translatorMgr = require('../translator/translatorMgr');
var realFind = translatorMgr.find;
var mockFind = function (type) {
    var translator = {};
    if(type == 'MemberExpression') {
        translator.translate = function () {
            return ['user.getAddress', 'null'];
        }
    }
    else if(type == 'Identifier') {
        translator.translate = function (env, ast) {
            return [ast.name, 'null'];
        }
    }

    return translator;
}

var genAst = function (code) {
    var esprima = require('esprima');
    var ast = esprima.parse(code);
    return ast.body[0].expression;
}

describe('ExpressionCall', function () {
    describe('#call system function', function(){
        it('native()', function () {
            var translate = require('../translator/expressionCall').translate;
            var ast = genAst('native(\'This is a Test\')');
            var ret = translate([], ast);
            var expectedResult = 'This is a Test';
            expect(ret).to.equal(expectedResult);
        })
    });

    describe('#handle member call', function(){
        before(function () {
            muk(translatorMgr, 'find', mockFind);
        })
        
        after(function () {
            muk(translatorMgr, 'find', realFind);
        })

        it('translate without arguments ', function () {
            var translate = require('../translator/expressionCall').translate;
            var ast = genAst('user.getAddress()');
            var ret = translate([], ast);
            var expectedResult = ['user.getAddress()', 'null'];
            expect(ret).to.deep.equal(expectedResult);
        })

        it('translate with one argument ', function () {
            var translate = require('../translator/expressionCall').translate;
            var ast = genAst('user.getAddress(home)');
            var ret = translate([], ast);
            var expectedResult = ['user.getAddress(home)', 'null'];
            expect(ret).to.deep.equal(expectedResult);
        })

        it('translate with two argument ', function () {
            var translate = require('../translator/expressionCall').translate;
            var ast = genAst('user.getAddress(home, company)');
            var ret = translate([], ast);
            var expectedResult = ['user.getAddress(home, company)', 'null'];
            expect(ret).to.deep.equal(expectedResult);
        })
    });
});