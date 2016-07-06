%lex

int  "-"?([0-9]|[1-9][0-9]+)
exp  [eE][-+]?[0-9]+
frac  "."[0-9]+

%%
\s+      /* skip whitespace */


\"import\"      return 'IMPORT'
\"viewModels\"  return 'VIEWMODELS'
\"content\"     return 'CONTENT'
\"units\"       yytext = yytext.substr(1,yyleng-2); return 'UNITS'
\"event\"       yytext = yytext.substr(1,yyleng-2); return 'EVENT'
\"bind\"        yytext = yytext.substr(1,yyleng-2); return 'BIND'
\"type\"        yytext = yytext.substr(1,yyleng-2); return 'TYPE'
\"name\"        yytext = yytext.substr(1,yyleng-2); return 'NAME'
\"init\"        yytext = yytext.substr(1,yyleng-2); return 'INIT'
\"config\"        yytext = yytext.substr(1,yyleng-2); return 'VCCONFIG'
\"\@\{.*\}\"    yytext = yytext.substr(1,yyleng-2); return 'BINDINGPROP'
/*function.*\(\).*\{.*?\} return 'FUNCTION'*/
function\s*\(\)\s*\{\s*.*?\s*\}    return 'FUNCTION'



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
    var parserUtil = require('../parserUtil/vcUtil');
%}

%start ConfigEntry

%%

ConfigEntry
    : '{' ConfigList '}'
        {
            parserUtil.createEssentialMethod(yy.class, yy.onCreate, yy.onCreateView, yy.onDestroy);
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
    | ViewModels
    | Events
    | Bind
    | Content
    | VCConfig
    ;

ClassName
    : NAME ':' JSONString
        { yy.class.name = $3; }
    ;

Import
    : IMPORT ':' '[' ImportList ']'
        { yy.class.import = $4;}
    ;

ImportList
    : JSONString
        {$$ = [$1];}
    | ImportList ',' JSONString
        {$$=$1;$$.push($3)}
    ;

ViewModels
    : VIEWMODELS ':' '[' ViewModelList ']'
        {
            parserUtil.createViewModelsFiled(yy.class, $4)
            yy.onCreate += parserUtil.createViewModelsInit($4);
        }
    ;

ViewModelList
    : ViewModel
        {$$ = [$1];}
    | ViewModelList ',' ViewModel
        {$$=$1;$$.push($3);}
    ;

ViewModel
    : '{' TYPE ':' JSONString ',' NAME ':' JSONString '}'
        {$$ = {};$$['type'] = $4; $$['name'] = $8; $$['defaultValue'] = null;}
    | '{' TYPE ':' JSONString ',' NAME ':' JSONString ',' INIT ':' JSONObject '}'
        {$$ = {};$$['type'] = $4; $$['name'] = $8; $$['defaultValue'] = null;}
    ;

Content
    : CONTENT ':' Widget
    ;

Widget
    : '{' WidgetProperties '}'
        {
            $$=$2;
            parserUtil.createEvents(yy.class, $$);
        }
    ;

WidgetProperties
    : WidgetProperty
        {$$ = {}; $$[$1[0]] = $1[1];}
    | WidgetProperties ',' WidgetProperty
        {$$ = $1; $1[$3[0]] = $3[1];}
    ;

WidgetProperty
    : JSONMember
    | Units
    | Events
    ;

BindingProperty
    : JSONString ':' BINDINGPROP
        {$$ = [$1, $3];}
    ;

Units
    : UNITS ':' '[' WidgetList ']'
        {$$ = [$1, $4];}
    ;

WidgetList
    : Widget
        {$$=[$1]}
    | WidgetList ',' Widget
        {$$ = $1; $$.push($3)}
    ;

Events
    : EVENT ':' '{' EventList '}'
        {$$ = [$1, $4]}
    ;

EventList
    : Event
        {{$$ = {}; $$[$1[0]] = $1[1];}}
    | EventList ',' Event
        {$$ = $1; $1[$3[0]] = $3[1];}
    ;

Event
    : JSONString ':' JSONString
        {$$ = [$1, $3];}
    ;

Bind
    : BIND ':' '{' EventList '}'
    ;

VCConfig
    : VCCONFIG ':' JSONObject
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
    | CONTENT ':' JSONValue
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