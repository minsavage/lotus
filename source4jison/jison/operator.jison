%lex

int  "-"?([0-9]|[1-9][0-9]+)
exp  [eE][-+]?[0-9]+
frac  "."[0-9]+

%%
\s+      /* skip whitespace */


\"function\s*\(\w*\)\s*\{\s*(.*\s*)*?\}\"    yytext = yytext.substr(1,yyleng-2); return 'FUNCTION'
\"import\"      return 'IMPORT'
\"viewModels\"  return 'VIEWMODELS'
\"content\"     return 'CONTENT'
\"units\"       yytext = yytext.substr(1,yyleng-2); return 'UNITS'
\"event\"       yytext = yytext.substr(1,yyleng-2); return 'EVENT'
\"bind\"        yytext = yytext.substr(1,yyleng-2); return 'BIND'
\"type\"        yytext = yytext.substr(1,yyleng-2); return 'TYPE'
\"name\"        yytext = yytext.substr(1,yyleng-2); return 'NAME'
\"init\"        yytext = yytext.substr(1,yyleng-2); return 'INIT'
\"\@\{.*\}\"    yytext = yytext.substr(1,yyleng-2); return 'BINDINGPROP'
/*\"function\s*\(\w*\)\s*\{\s*.*?\s*\}\"    yytext = yytext.substr(1,yyleng-2); return 'FUNCTION'*/
\"properties\" yytext = yytext.substr(1,yyleng-2); return 'PROPS'
\"defaultValue\"    yytext = yytext.substr(1,yyleng-2); return 'DEFAULTVALUE'
\"action\"    yytext = yytext.substr(1,yyleng-2); return 'ACTION'
\"query\"    yytext = yytext.substr(1,yyleng-2); return 'QUERY'
\"insert\"    yytext = yytext.substr(1,yyleng-2); return 'INSERT'
\"update\"    yytext = yytext.substr(1,yyleng-2); return 'UPDATE'
\"delete\"    yytext = yytext.substr(1,yyleng-2); return 'DELETE'
\"responseConverter\"    yytext = yytext.substr(1,yyleng-2); return 'RC'
\"convertedType\"    yytext = yytext.substr(1,yyleng-2); return 'CT'
\"actions\"    yytext = yytext.substr(1,yyleng-2); return 'ACTIONS'
\"op\"    yytext = yytext.substr(1,yyleng-2); return 'OP'


{int}{frac}?{exp}?\b    return 'NUMBER'
\"(?:'\\'[\\"bfnrt/]|'\\u'[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*\"    yytext = yytext.substr(1,yyleng-2); return 'STRING'

"{"      return '{'
"}"      return '}'
"["      return '['
"]"      return ']'
","      return ','
":"      return ':'
"true"   return 'TRUE'
"false"  return 'FALSE'
"null"   return 'NULL'
<<EOF>>  return 'EOF'
.        return 'INVALID'

%%

/lex

%{
    var R = require('ramda');
    var parserUtil = require('../parserUtil/operatorUtil');
%}

%start ConfigEntry

%%

ConfigEntry
    : '{' ConfigList '}'
        {
            parserUtil.final(yy.class);
            return yy.class;
        }
    ;

ConfigList
    : Config
    | ConfigList ',' Config
    ;

Config
    : ClassName
    | Import
    | Actions
    | Type
    ;

ClassName
    : NAME ':' JSONString
        {
            yy.class.name = $3;
        }
    ;

Import
    : IMPORT ':' '[' ImportList ']'
        {
            yy.class.import = $4;
        }
    ;

ImportList
    : JSONString
        {$$ = [$1];}
    | ImportList ',' JSONString
        {$$=$1;$$.push($3)}
    ;

Type
    : TYPE ':' JSONValue
    ;

Actions
    : ACTION ':' '{' ActionList '}'
    ;

ActionList
    : Action
        {$$ = [$1];}
    | ActionList ',' Action
        {$$=$1;$$.push($3);}
    ;

Action
    : ActionKey ':' '{' ActionConfigList'}'
        {
            parserUtil.createQueryMethod(yy.class, $4);
            var method = parserUtil.createQueryMethodService($4);
            yy.serviceMethods.push(method);
        }
    ;

ActionKey
    : QUERY
    | INSERT
    | UPDATE
    | DELETE
    ;

ActionConfigList
    : ActionConfig
        {$$ = {}; $$[$1[0]] = $1[1];}
    | ActionConfigList ',' ActionConfig
        {$$ = $1; $1[$3[0]] = $3[1];}
    ;

ActionConfig
    : UrlConfig
    | MethodConfig
    | ParametersConfig
    | responseTypeConfig
    | ResponseConverterConfig
    | JSONMember
    ;

ResponseConverterConfig
    : RC ':' '{' RCMemberList '}'
        {$$ = [$1, $4]}
    ;

RCMemberList
    : RCMember
        {$$ = {}; $$[$1[0]] = $1[1];}
    | RCMemberList ',' RCMember
       {$$ = $1; $1[$3[0]] = $3[1];}
    ;

RCMember
    : ConvertedType
    | ResponseActions
    ;

ConvertedType
    : CT ':' JSONString
        {$$ = [$1, $3];}
    ;

ResponseActions
    : ACTIONS ':' '[' ResponseActionList ']'
        {$$ = [$1, R.join('.', $4)]}
    ;

ResponseActionList     
    : ResponseAction
        {$$ = [$1];}
    | ResponseActionList ',' ResponseAction
        {$$ = $1; $1.push($3);}
    ;

ResponseAction
    : '{' OP ':' JSONString ',' ACTION ':' FUNCTION '}'
        {
            var c = {};c['op'] = $4; c['action'] = $8;
            $$ = parserUtil.createConverter(c);
        }
    ;

Properties
    : PROPS ':' '[' PropertyList ']'
        {
            parserUtil.createFields(yy.class, $4);
        }
    ;

PropertyList
    : Property
        {$$ = [$1];}
    | PropertyList ',' Property
        {$$=$1;$$.push($3);}
    ;

Property
    : '{' PropertyMemberList '}'
        {$$ = $2;}
    ;

PropertyMemberList
    : PropertyMember
        {$$ = {}; $$[$1[0]] = $1[1];}
    | PropertyMemberList ',' PropertyMember
       {$$ = $1; $1[$3[0]] = $3[1];}
    ;

PropertyMember
    : PropertyKey ':' JSONValue
        {$$ = [$1, $3];}
    ;

PropertyKey
    : NAME
    | TYPE
    | DEFAULTVALUE
    ;

JSONString
    : STRING
        { // replace escaped characters with actual character
          $$ = yytext.replace(/\\(\\|")/g, "$"+"1")
                     .replace(/\\n/g,'\n')
                     .replace(/\\r/g,'\r')
                     .replace(/\\t/g,'\t')
                     .replace(/\\v/g,'\v')
                     .replace(/\\f/g,'\f')
                     .replace(/\\b/g,'\b');
        }
    ;

JSONNumber
    : NUMBER
        {$$ = Number(yytext);}
    ;

JSONNullLiteral
    : NULL
        {$$ = null;}
    ;

JSONBooleanLiteral
    : TRUE
        {$$ = true;}
    | FALSE
        {$$ = false;}
    ;

JSONText
    : JSONValue EOF
        {return $$ = $1;}
    ;

JSONValue
    : JSONNullLiteral
    | JSONBooleanLiteral
    | JSONString
    | JSONNumber
    | JSONObject
    | JSONArray
    | BINDINGPROP
    ;

JSONObject
    : '{' '}'
        {{$$ = {};}}
    | '{' JSONMemberList '}'
        {$$ = $2;}
    ;

JSONMember
    : JSONString ':' JSONValue
        {$$ = [$1, $3];}
    | TYPE ':' JSONValue
        {$$ = [$1, $3];}
    | NAME ':' JSONValue
        {$$ = [$1, $3];}
    ;

JSONMemberList
    : JSONMember
        {{$$ = {}; $$[$1[0]] = $1[1];}}
    | JSONMemberList ',' JSONMember
        {$$ = $1; $1[$3[0]] = $3[1];}
    ;

JSONArray
    : '[' ']'
        {$$ = [];}
    | '[' JSONElementList ']'
        {$$ = $2;}
    ;

JSONElementList
    : JSONValue
        {$$ = [$1];}
    | JSONElementList ',' JSONValue
        {$$ = $1; $1.push($3);}
    ;