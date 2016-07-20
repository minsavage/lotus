/**
 * Created by danney on 16/6/25.
 */
'use strict'

class Field {
    constructor() {
        this.name = '';
        this.type = null;
        this.defaultValue = null;
        this.isProperty = false;
        this.modifiers = [];
    }
}

module.exports = Field;