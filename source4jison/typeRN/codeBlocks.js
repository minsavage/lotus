'use strict'

class CodeBlocks {
    constructor() {
        this.blocks = []; 
    }

    static create(blocks) {
        let codeBlocks = new CodeBlocks();
        if(blocks instanceof Array) {
            codeBlocks.blocks = blocks;
        }
        return codeBlocks;
    }
}

module.exports = CodeBlocks;