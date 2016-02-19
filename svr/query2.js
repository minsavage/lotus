/**
 * Created by danney on 16/2/15.
 */

function queryWeibos(req, res, next) {
    var models = [];

    var q = async.queue(function(item, callback){
        var model = {};
        model.objectId = item._id;
        model.createTime = item.createTime;
        model.updateTime = item.updateTime;
        model.content = item.content;
        model.authorId = item.authorId;

        var objectId = new ObjectID(item.authorId);
        db.collection('users').findOne({_id: objectId}, function(err, item){
            model.authorName = item.userName;
            model.authorAvatarUrl = item.avatarUrl;
            models.push(model);
            callback();
        })
    });

    q.drain = function() {
        res.send(models);
        next();
    };

    db.collection('weibos').find().each(function(err, item){
        q.push(item);
    });
}

function queryWeibos(req, res, next) {
    var models = [];
    var totalCount = 0;

    var q = async.queue(function(item, callback){
        var model = {};

        model.objectId = item._id;
        model.createTime = item.createTime;
        model.updateTime = item.updateTime;
        model.content = item.content;
        model.authorId = item.authorId;

        var userFields = {
            userName: true,
            avatarUrl: true
        };

        var objectId = new ObjectID(weibo.authorId);

        db.collection('users').findOne({_id: objectId}, userFields, function(err, user){
            model.authorName = user.userName;
            model.authorAvatarUrl = user.avatarUrl;

            models.push(weibo);
            callback();
        })
    });

    q.drain = function() {
        res.charSet('utf-8');
        res.setHeader('X-Total-Count', totalCount);
        res.send(models);
        next();
    };

    var from = req.params['from'];
    if(!util.isNullOrUndefined(from)) {
        from = parseInt(from);
        condition["createTime"] = from;
    }

    var weiboFields = {
        _id: true,
        createTime: true,
        updateTime: true,
        content: true,
        authorId: true
    }

    var cursor = db.collection('weibos').find(condition, weiboFields).sort({createTime:1});

    cursor.count(function(err, count){
        totalCount = count;
        cursor.limit(30).each(function(err, item){
            q.push(item);
        });
    });
}

function queryWeibo(req, res, next) {
    var condition = {};

    var from = req.params['from'];
    if(!util.isNullOrUndefined(from)) {
        from = parseInt(from);
        condition["createTime"] = from;
    }

    var cursor = db.collection('weibos').find(condition).sort({createTime:1});

    cursor.count(function(err, count){
        cursor.limit(30).toArray(function(err, docs){
            ret = docs;
            res.charSet('utf-8');
            res.setHeader('X-Total-Count', count);
            res.send(ret);
            next();
        });
    });

    var models = [];

    var q = async.queue(function(item, callback){
        var model = {};
        model.objectId = item._id;
        model.createTime = item.createTime;
        model.updateTime = item.updateTime;
        model.content = item.content;
        model.authorId = item.authorId;

        var objectId = new ObjectID(item.authorId);
        db.collection('users').findOne({_id: objectId}, function(err, item){
            model.authorName = item.userName;
            model.authorAvatarUrl = item.avatarUrl;
            models.push(model);
            callback();
        })
    });

    q.drain = function() {
        res.send(viewModels);
        next();
    };

    db.collection('weibos').find().each(function(err, item){
        q.push(item);
    });
}

///------------

function queryWeibos(req, res, next) {
    var models = [];
    var totalCount = 0;

    var q = async.queue(onQueryCallback);
    q.drain = done;

    startQuery();

    function startQuery() {
        var from = req.params['from'];
        if(!util.isNullOrUndefined(from)) {
            from = parseInt(from);
            condition["createTime"] = from;
        }

        var weiboFields = {
            _id: true,
            createTime: true,
            updateTime: true,
            content: true,
            authorId: true
        }

        var cursor = db.collection('weibos').find(condition, weiboFields).sort({createTime:1});

        cursor.count(function(err, count){
            totalCount = count;
            cursor.limit(30).each(function(err, item){
                q.push(item);
            });
        });
    }

    function onQueryCallback(item, callback) {
        var model = {};

        model.objectId = item._id;
        model.createTime = item.createTime;
        model.updateTime = item.updateTime;
        model.content = item.content;
        model.authorId = item.authorId;

        var userFields = {
            userName: true,
            avatarUrl: true
        };

        var objectId = new ObjectID(weibo.authorId);

        db.collection('users').findOne({_id: objectId}, userFields, function(err, user){
            model.authorName = user.userName;
            model.authorAvatarUrl = user.avatarUrl;

            models.push(model);
            callback();
        })
    }

    function done() {
        res.charSet('utf-8');
        res.setHeader('X-Total-Count', totalCount);
        res.send(models);
        next();
    }
}


function queryWeibos2(req, res, next) {
    var models = [];
    var totalCount = 0;

    var from = req.params['from'];
    if(!util.isNullOrUndefined(from)) {
        from = parseInt(from);
        condition["createTime"] = from;
    }

    var weiboFields = {
        _id: true,
        createTime: true,
        updateTime: true,
        content: true,
        authorId: true
    }

    var cursor = db.collection('weibos').find(condition, weiboFields).sort({createTime:1});

    cursor.count(function(err, count){
        totalCount = count;
        cursor.limit(30).each(function(err, item){
            var model = {};
            model.objectId = item._id;
            model.createTime = item.createTime;
            model.updateTime = item.updateTime;
            model.content = item.content;
            model.authorId = item.authorId;
            models.push(model);
        });
    });
}


function xxx(req, res, next) {
    var models = [];
    var totalCount = 0;

    var q = async.queue(onQueryCallback);
    q.drain = done;

    startQuery();

    function startQuery() {
        var condition = {};



        var weiboFields = {
            content: true,
            commentCount: true,
            likeCount: true,
            authorId: true
        }

        var cursor = db.collection('weibo').find(condition, weiboFields).sort({"createTime":-1});

        cursor.count(function(err, count){
            totalCount = count;
            cursor.limit(50).each(function(err, item){
                if(item != null) {
                    q.push(item);
                }
            });
        });
    }

    function onQueryCallback(item, callback) {
        var model = {};
        model.content = item.content;
        model.commentCount = item.commentCount;
        model.likeCount = item.likeCount;
        model.authorId = item.authorId;

        var userFields = {
            name: true,
            avatarUrl: true
        }

        var objectId = new ObjectID(model.objectId);

        db.collection('user').findOne({_id: objectId}, userFields, function(err, item){
            model.authorName = item.name;
            model.authorAvatarUrl = item.avatarUrl;
            models.push(model);
            callback();
        });
    }

    function done() {
        res.charSet('utf-8');
        res.setHeader('X-Total-Count', totalCount);
        res.send(models);
        next();
    }
}