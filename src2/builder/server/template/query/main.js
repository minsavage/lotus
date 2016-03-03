function {{functionName}}(req, res, next) {
    var db = require('./db').get();
    var models = [];
    var totalCount = 0;

    var q = async.queue(onQueryCallback);
    q.drain = done;

    startQuery();

    function startQuery() {
        var condition = getCondition(req);

        {{find}}
    }

    function onQueryCallback(item, callback) {
        var model = {};
        model.objectId = item._id;
        model.createTime = item.createTime;
        model.updateTime = item.updateTime;
        {{assignment}}

        {{findOne}}
    }

    function done() {
        res.charSet('utf-8');
        res.setHeader('X-Total-Count', totalCount);
        res.send(models);
        next();
    }
}

var getCondition = function(req) {
    var condition = {};
    {{condition}}
    return condition;
}

var setCondition = function(condition, key, compareOp, value) {
    if(util.isNullOrUndefined(condition[key])) {
        condition[key] = {};
    }

    condition[key][compareOp] = value;
}