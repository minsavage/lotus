#!/usr/bin/env node

var minimist = require('minimist');
var util = require('util');
var path = require('path');

var argv = minimist(process.argv.slice(2), {
    alias: {h: 'help', v: 'version' }
});

function showUsage() {
    console.log('Usage:');
    console.log('   lotus [options]');
    console.log();
    console.log('Available options:');
    console.log();
    console.log('  -i   			Root dir of project config, default by "."');
    console.log('  -o          		Output dir of generated source code, default by "./output/"');
    console.log('  -f        		Generate source code by specified file or dir');
    console.log('  -p          		Generate android project');
    console.log('  -v, --version  	Show program version');
    console.log();
}

if(!util.isNullOrUndefined(argv.h)) {
    showUsage();
    return;
}

var map = {};

if(!util.isNullOrUndefined(argv.i)) {
    map.input = path.resolve(argv.i)
}
else {
    map.input = path.resolve('.')
}

if(!util.isNullOrUndefined(argv.o)) {
    map.output = path.resolve(argv.o);
}
else {
    map.output = path.resolve('./output');
}

console.log('input:' + map['input']);
console.log('output:' + map['output']);


var start = require('../src/app');
start(map);