'use strict'
let fs = require('fs');

let resetParser = function (parser) {
    parser.yy.vc = { onCreate: '', onCreateView: '', onDestroy: '' };

    parser.yy.model = {
        fields: [],
        methods: [],
        import: [],
        importNative: [],
        innerClasses: []
    };

    parser.yy.operator = {};
    parser.yy.vm = {};
}


let stringify = require('./util/stringify');
let model = require('../project/maoyan/operator/actorsOperator');
let parser = require('./parser/operator').parser;
let operatorUtil = require('./parserUtilRN/operatorUtil');
let translateClass = require('./translatorRN/translateClass');

model = stringify(model);
resetParser(parser);
let ret = parser.parse(model);

ret = translateClass(ret);

let filePath = './actorsOperator.js';
fs.writeFileSync(filePath, ret);


//ViewModel
model = require('../project/maoyan/viewModel/actorsViewModel');
parser = require('./parser/viewModel').parser;
let vmUtil = require('./parserUtil/vmUtil');
model = stringify(model);
resetParser(parser);
ret = parser.parse(model);
ret = translateClass(ret);
filePath = './actorsViewModel.js';
fs.writeFileSync(filePath, ret);


console.log(ret);