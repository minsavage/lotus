%lex

int  "-"?([0-9]|[1-9][0-9]+)
exp  [eE][-+]?[0-9]+
frac  "."[0-9]+

%%
\s+      /* skip whitespace */

\"function\s*\(\)\s*\{\s*.*?\s*\}\"    return 'FUNCTION'
\"import\"      return 'IMPORT'
\"viewModels\"  return 'VIEWMODELS'
\"content\"     return 'CONTENT'
\"units\"       yytext = yytext.substr(1,yyleng-2); return 'UNITS'
\"event\"       yytext = yytext.substr(1,yyleng-2); return 'EVENT'
\"bind\"        yytext = yytext.substr(1,yyleng-2); return 'BIND'
\"type\"        yytext = yytext.substr(1,yyleng-2); return 'TYPE'
\"name\"        yytext = yytext.substr(1,yyleng-2); return 'NAME'
\"init\"        yytext = yytext.substr(1,yyleng-2); return 'INIT'
\"\@\{.*\}\"    yytext = yytext.substr(3,yyleng-5); return 'BINDINGPROP'
\"properties\"      yytext = yytext.substr(1,yyleng-2); return 'PROPS'
\"defaultValue\"    yytext = yytext.substr(1,yyleng-2); return 'DEFAULTVALUE'
\"methods\"         yytext = yytext.substr(1,yyleng-2); return 'METHODS'
\"action\"          yytext = yytext.substr(1,yyleng-2); return 'ACTION'
\"parameters\"      yytext = yytext.substr(1,yyleng-2); return 'PARAMETERS'
\"responsePipe\"    yytext = yytext.substr(1,yyleng-2); return 'RESPONSE'
\"op\"              yytext = yytext.substr(1,yyleng-2); return 'OP'





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
    var parserUtil = require('../parserUtil/vmUtil');
    var aClass = parserUtil.createClass();
%}

%start ConfigEntry

%%

ConfigEntry
    : '{' ConfigList '}'
        {return aClass;}
    ;

ConfigList
    : Config
    | ConfigList ',' Config
    ;

Config
    : ClassName
    | Import
    | Properties
    | Methods
    ;

ClassName
    : NAME ':' JSONString
        {
            aClass.name = $3;
        }
    ;

Import
    : IMPORT ':' '[' ImportList ']'
        {
            aClass.import = $4;
        }
    ;

ImportList
    : JSONString
        {$$ = [$1];}
    | ImportList ',' JSONString
        {$$=$1;$$.push($3)}
    ;

Properties
    : PROPS ':' '[' PropertyList ']'
        {
            parserUtil.createFields(aClass, $4);
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

Methods
    : METHODS ':' '{' MethodList '}'
    ;

MethodList
    : Method
        {$$ = {}; $$[$1[0]] = $1[1];}
    | MethodList ',' Method
       {$$ = $1; $1[$3[0]] = $3[1];}
    ;

Method
    : JSONString ':' '{' MethodConfigList '}'
        {
            parserUtil.createOperatorMethod(aClass, $1, $4);
        }
    ;

MethodConfigList
    : MethodConfig
        {$$ = {}; $$[$1[0]] = $1[1];}
    | MethodConfigList ',' MethodConfig
       {$$ = $1; $1[$3[0]] = $3[1];}
    ;

MethodConfig
    : Action
    | Parameters
    | ResponsePipe
    ;

Action
    : ACTION ':' JSONString
        {$$ = [$1, $3]}
    ;

Parameters
    : PARAMETERS ':' '{' ParameterList '}'
        {$$ = [$1, $4]}
    ;

ParameterList
    : Parameter
        {$$ = {}; $$[$1[0]] = $1[1];}
    | ParameterList ',' Parameter
       {$$ = $1; $1[$3[0]] = $3[1];}
    ;

Parameter
    : JSONString ':' BINDINGPROP
        {$$ = [$1, $3];}
    ;

ResponsePipe
    : RESPONSE ':' '[' ResponseItemList ']'
        {$$=[$1, $4]}
    ;

ResponseItemList
    : ResponseItem
        {$$ = [$1]}
    | ResponseItemList ',' ResponseItem
       {$$ = $1; $$.push($3)}
    ;

ResponseItem
    : '{' OP ':'  JSONString ',' ACTION ':' FUNCTION '}'
        {$$={op: $4, action: $8}}
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