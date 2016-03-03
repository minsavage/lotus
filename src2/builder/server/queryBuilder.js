/**
 * Created by danney on 16/2/15.
 */
var mustache = require('mustache');
var path = require('path');
var lotus = require('../../lotus');
var tpl = lotus.template(path.resolve(__dirname, './template'));
var util = require('util');
var jsCodeUtil = lotus.util.jsCodeUtil;

var QueryBuilder = function() {
    this._assignments = {};
    this._fields = {};
    this._masterCollectionName = '';

    this._codeFind = '';
    this._codeFindOne = '';
    this._codeCondition = '';
};
QueryBuilder.prototype.parse = function(operator) {
    var query = operator.action.query;
    var bind = operator.bind;

    if(util.isNullOrUndefined(operator.bind)) {
        return '';
    }

    this._buildFieldAndAssignment(operator.bind.map);
    this._buildCondition(operator);
    this._buildFind(operator);

    if(operator.bind.collections.length > 1) {
        this._buildFindOne(operator);
    }
    else {
        this._codeFindOne = tpl.query.push;
    }

    var functionName = lotus.util.nameUtil.operatorToServerFunctionName(operator, 'query');

    return mustache.render(tpl.query.main, {
        functionName: functionName,
        condition: this._codeCondition,
        find: this._codeFind,
        assignment: this._assignments[this._masterCollectionName],
        findOne: this._codeFindOne
    })
}

QueryBuilder.prototype._buildCondition = function(operator) {
    var parameters = operator.action.query.parameters;
    var condition = operator.action.query.condition;

    var code = ''
    for(var name in parameters) {
        var p = parameters[name];

        var content = buildConditionAssign(name, condition);

        var typeTranslate = '';
        if(p.type != 'string') {
            typeTranslate = jsCodeUtil.generateStringToType(name, name, p.type);
        }

        var isNull = jsCodeUtil.generateIsNullForType(name, p.type);

        code += mustache.render(tpl.query.getParameter, {
            parameterName: name,
            isNull: isNull,
            typeTranslate: typeTranslate,
            content: content
        }) + '\r';

        if(p.canBeNull == false) {
            code += tpl.query.throw + '\r';
        }
    }

    this._codeCondition = code.trim();
}

var buildConditionAssign = function(parameterName, condition) {
    var code = '';

    for(var k in condition) {
        v = condition[k];
        if(util.isString(v)) {
            if(v == parameterName) {
                if(k == 'objectId') {
                    k = '_id';
                    v = 'new ObjectID(' + v + ')';
                }

                code = mustache.render(tpl.query.conditionAssign, {
                    key: k,
                    value: v
                });
            }
        }
        else if(util.isObject(v)) {
            var compareObj = {};
            for(var compare in v) {
                var p = v[compare];
                if(p == parameterName) {
                    code = mustache.render(tpl.query.setCondition, {
                        key: k,
                        compare: compare,
                        value: p
                    });
                }
            }
        }
    }

    return code;
}

QueryBuilder.prototype._buildFind = function(operator) {
    var collection = null;
    var collections = operator.bind.collections;
    if(collections.length == 1) {
        collection = collections[0];
    }
    else {
        for(var k in collections) {
            var c = collections[k];
            if(c.type == 'master') {
                collection = c;
                break;
            }
        }
    }

    if(collection == null) {
        throw 'can not find master collection in bind field';
    }

    this._masterCollectionName = collection.name;

    var fieldsName = collection.name + 'Fields';
    var fields = this._fields[collection.name];
    fields = 'createTime: true,\rupdateTime:true,\r' + fields;

    var maxLimit = 100;
    var limit = operator.action.query.limit;
    limit = parseInt(limit);
    if(isNaN(limit)|| limit > maxLimit) {
        limit = maxLimit;
    }

    var sort = operator.action.query.sort;
    var sortStr = '';
    if(!util.isNullOrUndefined(sort)) {
        sortStr = mustache.render(tpl.query.sort, {sort: JSON.stringify(sort)});
    }

    this._codeFind = mustache.render(tpl.query.find, {
        fieldsName: fieldsName,
        fields: fields,
        collectionName: collection.name,
        sort: sortStr,
        limit: limit
    });
}

QueryBuilder.prototype._buildFindOne = function(operator) {
    var collection = null;
    var collections = operator.bind.collections;
    for(var k in collections) {
        var c = collections[k];
        if(c.type == 'secondary') {
            collection = c;
            break;
        }
    }

    if(collection == null) {
        return;
    }

    var fieldsName = collection.name + 'Fields';
    var fields = this._fields[collection.name];

    if(util.isNullOrUndefined(collection.condition.objectId)) {
        throw 'can not find objectId of secondary collection in bind field';
    }

    var array = collection.condition.objectId.split('.');
    var objectId = array[1];

    this._codeFindOne = mustache.render(tpl.query.findOne, {
        fieldsName: fieldsName,
        fields: fields,
        objectId: objectId,
        collectionName: collection.name,
        assignment: this._assignments[collection.name]
    });
}


QueryBuilder.prototype._buildFieldAndAssignment = function(map) {
    var assignments = {};
    var fields = {};

    var tplAssign = 'model.{{key}} = item.{{field}};';
    var tplField = '{{field}}: true,';

    for(var k in map) {
        var v = map[k];
        var array = v.split('.');
        var schema = array[0];
        var field = array[1];

        if(util.isNullOrUndefined(assignments[schema])) {
            assignments[schema] = '';
        }

        if(util.isNullOrUndefined(fields[schema])) {
            fields[schema] = '';
        }

        var assign = mustache.render(tplAssign, {
            key: k,
            field: field
        })

        var field = mustache.render(tplField, {field: field});

        assignments[schema] += assign + '\r';
        fields[schema] += field + '\r';
    }

    for(var k in fields) {
        var field = fields[k].trim();
        field = field.substr(0, field.length-1);
        fields[k] = field;
    }

    this._assignments = assignments;
    this._fields = fields;
}

module.exports = QueryBuilder;