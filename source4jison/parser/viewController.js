/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var viewController = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,12],$V1=[1,13],$V2=[1,14],$V3=[1,17],$V4=[1,15],$V5=[1,16],$V6=[1,18],$V7=[6,8],$V8=[1,30],$V9=[1,36],$Va=[1,38],$Vb=[1,43],$Vc=[1,54],$Vd=[1,55],$Ve=[1,56],$Vf=[8,22],$Vg=[1,66],$Vh=[6,8,22],$Vi=[1,95],$Vj=[1,90],$Vk=[1,94],$Vl=[1,91],$Vm=[1,92],$Vn=[1,93];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"ConfigEntry":3,"{":4,"ConfigList":5,"}":6,"Config":7,",":8,"ClassName":9,"Import":10,"ViewModels":11,"Events":12,"Bind":13,"Content":14,"VCConfig":15,"NAME":16,":":17,"JSONString":18,"IMPORT":19,"[":20,"ImportList":21,"]":22,"VIEWMODELS":23,"ViewModelList":24,"ViewModel":25,"TYPE":26,"INIT":27,"JSONObject":28,"CONTENT":29,"Widget":30,"WidgetProperties":31,"WidgetProperty":32,"JSONMember":33,"Units":34,"BindingProperty":35,"BINDINGPROP":36,"UNITS":37,"WidgetList":38,"EVENT":39,"EventList":40,"Event":41,"FUNCTION":42,"BIND":43,"VCCONFIG":44,"STRING":45,"JSONNumber":46,"NUMBER":47,"JSONNullLiteral":48,"NULL":49,"JSONBooleanLiteral":50,"TRUE":51,"FALSE":52,"JSONText":53,"JSONValue":54,"EOF":55,"JSONArray":56,"JSONMemberList":57,"JSONElementList":58,"$accept":0,"$end":1},
terminals_: {2:"error",4:"{",6:"}",8:",",16:"NAME",17:":",19:"IMPORT",20:"[",22:"]",23:"VIEWMODELS",26:"TYPE",27:"INIT",29:"CONTENT",36:"BINDINGPROP",37:"UNITS",39:"EVENT",42:"FUNCTION",43:"BIND",44:"VCCONFIG",45:"STRING",47:"NUMBER",49:"NULL",51:"TRUE",52:"FALSE",55:"EOF"},
productions_: [0,[3,3],[5,1],[5,3],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[9,3],[10,5],[21,1],[21,3],[11,5],[24,1],[24,3],[25,9],[25,13],[14,3],[30,3],[31,1],[31,3],[32,1],[32,1],[32,1],[35,3],[34,5],[38,1],[38,3],[12,5],[40,1],[40,3],[41,3],[13,5],[15,3],[18,1],[46,1],[48,1],[50,1],[50,1],[53,2],[54,1],[54,1],[54,1],[54,1],[54,1],[54,1],[54,1],[28,2],[28,3],[33,3],[33,3],[33,3],[57,1],[57,3],[56,2],[56,3],[58,1],[58,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

            if(yy.vc.layoutOnly == true) {yy.vc = {}; return null;}

            R.map(function(vmInfo){
                yy.vc.onCreate += vmInfo.init;
                yy.vc.onDestroy += 'native(\'' + vmInfo.destroy + '\')';
            }, yy.vc.viewModelsInfo);

            parserUtil.createEssentialMethod(yy);
            parserUtil.final(yy.class);

            yy.vc = {}; return yy.class;
        
break;
case 11:
 yy.class.name = $$[$0]; 
break;
case 12:
 yy.class.import = $$[$0-1];
break;
case 13: case 16: case 59:
this.$ = [$$[$0]];
break;
case 14:
this.$=$$[$0-2];this.$.push($$[$0])
break;
case 15:

            yy.vc.viewModelsInfo = parserUtil.createViewModelsInfo(yy.class, $$[$0-1])
        
break;
case 17:
this.$=$$[$0-2];this.$.push($$[$0]);
break;
case 18:
this.$ = {};this.$['type'] = $$[$0-5]; this.$['name'] = $$[$0-1]; this.$['defaultValue'] = null;
break;
case 19:
this.$ = {};this.$['type'] = $$[$0-9]; this.$['name'] = $$[$0-5]; this.$['defaultValue'] = null;
break;
case 21:

            this.$=$$[$0-1];
            parserUtil.createEvents(yy.class, this.$);
        
break;
case 22: case 32: case 55:
this.$ = {}; this.$[$$[$0][0]] = $$[$0][1];
break;
case 23: case 33: case 56:
this.$ = $$[$0-2]; $$[$0-2][$$[$0][0]] = $$[$0][1];
break;
case 27: case 34: case 52: case 53: case 54:
this.$ = [$$[$0-2], $$[$0]];
break;
case 28:
this.$ = [$$[$0-4], $$[$0-1]];
break;
case 29:
this.$=[$$[$0]]
break;
case 30:
this.$ = $$[$0-2]; this.$.push($$[$0])
break;
case 31:
this.$ = [$$[$0-4], $$[$0-1]]
break;
case 36:

            if($$[$0]['layoutOnly'] == true) {
                yy.vc.layoutOnly = true;
            }
        
break;
case 37:
 // replace escaped characters with actual character
          this.$ = yytext.replace(/\\(\\|")/g, "$"+"1")
                     .replace(/\\n/g,'\n')
                     .replace(/\\r/g,'\r')
                     .replace(/\\t/g,'\t')
                     .replace(/\\v/g,'\v')
                     .replace(/\\f/g,'\f')
                     .replace(/\\b/g,'\b');
        
break;
case 38:
this.$ = Number(yytext);
break;
case 39:
this.$ = null;
break;
case 40:
this.$ = true;
break;
case 41:
this.$ = false;
break;
case 42:
return this.$ = $$[$0-1];
break;
case 50:
this.$ = {};
break;
case 51: case 58:
this.$ = $$[$0-1];
break;
case 57:
this.$ = [];
break;
case 60:
this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);
break;
}
},
table: [{3:1,4:[1,2]},{1:[3]},{5:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:$V0,19:$V1,23:$V2,29:$V3,39:$V4,43:$V5,44:$V6},{6:[1,19],8:[1,20]},o($V7,[2,2]),o($V7,[2,4]),o($V7,[2,5]),o($V7,[2,6]),o($V7,[2,7]),o($V7,[2,8]),o($V7,[2,9]),o($V7,[2,10]),{17:[1,21]},{17:[1,22]},{17:[1,23]},{17:[1,24]},{17:[1,25]},{17:[1,26]},{17:[1,27]},{1:[2,1]},{7:28,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:$V0,19:$V1,23:$V2,29:$V3,39:$V4,43:$V5,44:$V6},{18:29,45:$V8},{20:[1,31]},{20:[1,32]},{4:[1,33]},{4:[1,34]},{4:$V9,30:35},{4:$Va,28:37},o($V7,[2,3]),o($V7,[2,11]),o([6,8,17,22],[2,37]),{18:40,21:39,45:$V8},{4:$Vb,24:41,25:42},{18:46,40:44,41:45,45:$V8},{18:46,40:47,41:45,45:$V8},o($V7,[2,20]),{12:52,18:53,26:$Vc,29:$Vd,31:48,32:49,33:50,34:51,37:$Ve,39:$V4,45:$V8},o($V7,[2,36]),{6:[1,57],18:53,26:$Vc,29:$Vd,33:59,45:$V8,57:58},{8:[1,61],22:[1,60]},o($Vf,[2,13]),{8:[1,63],22:[1,62]},o($Vf,[2,16]),{26:[1,64]},{6:[1,65],8:$Vg},o($V7,[2,32]),{17:[1,67]},{6:[1,68],8:$Vg},{6:[1,69],8:[1,70]},o($V7,[2,22]),o($V7,[2,24]),o($V7,[2,25]),o($V7,[2,26]),{17:[1,71]},{17:[1,72]},{17:[1,73]},{17:[1,74]},o($Vh,[2,50]),{6:[1,75],8:[1,76]},o($V7,[2,55]),o($V7,[2,12]),{18:77,45:$V8},o($V7,[2,15]),{4:$Vb,25:78},{17:[1,79]},o($V7,[2,31]),{18:46,41:80,45:$V8},{42:[1,81]},o($V7,[2,35]),o($Vh,[2,21]),{12:52,18:53,26:$Vc,29:$Vd,32:82,33:50,34:51,37:$Ve,39:$V4,45:$V8},{4:$Va,18:86,20:$Vi,28:88,36:$Vj,45:$V8,46:87,47:$Vk,48:84,49:$Vl,50:85,51:$Vm,52:$Vn,54:83,56:89},{4:$Va,18:86,20:$Vi,28:88,36:$Vj,45:$V8,46:87,47:$Vk,48:84,49:$Vl,50:85,51:$Vm,52:$Vn,54:96,56:89},{4:$Va,18:86,20:$Vi,28:88,36:$Vj,45:$V8,46:87,47:$Vk,48:84,49:$Vl,50:85,51:$Vm,52:$Vn,54:97,56:89},{20:[1,98]},o($Vh,[2,51]),{18:53,26:$Vc,29:$Vd,33:99,45:$V8},o($Vf,[2,14]),o($Vf,[2,17]),{18:100,45:$V8},o($V7,[2,33]),o($V7,[2,34]),o($V7,[2,23]),o($V7,[2,52]),o($Vh,[2,43]),o($Vh,[2,44]),o($Vh,[2,45]),o($Vh,[2,46]),o($Vh,[2,47]),o($Vh,[2,48]),o($Vh,[2,49]),o($Vh,[2,39]),o($Vh,[2,40]),o($Vh,[2,41]),o($Vh,[2,38]),{4:$Va,18:86,20:$Vi,22:[1,101],28:88,36:$Vj,45:$V8,46:87,47:$Vk,48:84,49:$Vl,50:85,51:$Vm,52:$Vn,54:103,56:89,58:102},o($V7,[2,53]),o($V7,[2,54]),{4:$V9,30:105,38:104},o($V7,[2,56]),{8:[1,106]},o($Vh,[2,57]),{8:[1,108],22:[1,107]},o($Vf,[2,59]),{8:[1,110],22:[1,109]},o($Vf,[2,29]),{16:[1,111]},o($Vh,[2,58]),{4:$Va,18:86,20:$Vi,28:88,36:$Vj,45:$V8,46:87,47:$Vk,48:84,49:$Vl,50:85,51:$Vm,52:$Vn,54:112,56:89},o($V7,[2,28]),{4:$V9,30:113},{17:[1,114]},o($Vf,[2,60]),o($Vf,[2,30]),{18:115,45:$V8},{6:[1,116],8:[1,117]},o($Vf,[2,18]),{27:[1,118]},{17:[1,119]},{4:$Va,28:120},{6:[1,121]},o($Vf,[2,19])],
defaultActions: {19:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    var parserUtil = require('../parserUtil/vcUtil');
    var R = require('ramda');
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 42
break;
case 2:return 19
break;
case 3:return 23
break;
case 4:return 29
break;
case 5:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 37
break;
case 6:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 39
break;
case 7:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 43
break;
case 8:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 26
break;
case 9:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 16
break;
case 10:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 27
break;
case 11:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 44
break;
case 12:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 36
break;
case 13:return 47
break;
case 14:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 45
break;
case 15:return 4
break;
case 16:return 6
break;
case 17:return 20
break;
case 18:return 22
break;
case 19:return 8
break;
case 20:return 17
break;
case 21:return 51
break;
case 22:return 52
break;
case 23:return 49
break;
case 24:return 55
break;
case 25:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/,/^(?:"function\s*\(\w*\)\s*\{\s*(.*\s*)*?\}")/,/^(?:"import")/,/^(?:"viewModels")/,/^(?:"content")/,/^(?:"units")/,/^(?:"event")/,/^(?:"bind")/,/^(?:"type")/,/^(?:"name")/,/^(?:"init")/,/^(?:"config")/,/^(?:"@\{.*\}")/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,/^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = viewController;
exports.Parser = viewController.Parser;
exports.parse = function () { return viewController.parse.apply(viewController, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}