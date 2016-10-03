'use strict'
let R = require('ramda')
let Class = require('../typeRN/class');
let translateClass = require('./translateClass');

let mapBlockToCode = (block) => {
    if (block instanceof Class) {
        return translateClass(block);
    }
    else {
        return block;
    }
}

let translate = R.compose(
    R.join('\r\r'),
    R.map(mapBlockToCode),
    R.prop('blocks')
)

module.exports = translate;