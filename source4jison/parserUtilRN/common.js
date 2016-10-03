'use strict'
let R = require('ramda')

let combineStyles = R.compose(
    R.join(', \r'),
    R.filter((x) => !R.isEmpty(x))
)

exports.combineStyles = combineStyles;