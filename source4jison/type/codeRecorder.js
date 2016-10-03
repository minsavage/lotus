'use strict'

class CodeRecorder {
    constructor() {
        this.layout = '';
        this.cons = '';
        this.onCreate = '';
        this.onDestroy = '';
        this.style = '';
        this.others = '';
        this.importLines = [];
    }
}

module.exports = CodeRecorder;