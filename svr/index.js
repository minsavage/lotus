/**
 * Created by danney on 16/1/30.
 */
var restify = require('restify');
var MongoClient = require('mongodb').MongoClient;
var server;
var util = require('util');
var async = require('async');
var ObjectID = require('mongodb').ObjectID;

//createServer();

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/lotus", function(err, database) {
    if(err) throw err;

    db = database;
    createServer();
});

var weibos = require('./quer3');
var queryWeibos = weibos.queryWeibos;


function createServer() {
    server = restify.createServer();
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    server.get('/audios', queryAudio);
    server.get('/weibos', queryWeibos);
    server.get('/weibos2', queryWeibos2);
    server.get('/weibos3', queryWeibos3);
    server.get('/weibos4', weibos.queryWeibos);


    server.listen(8081, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
}

function queryAudios(req, res, next) {
    console.log('queryAudios');

    var audio = {
        'objectIdd': '12345',
        'name': '海洋'
    }

    var collection = [];
    collection.push(audio);
    collection.push(audio);
    collection.push(audio);
    collection.push(audio);
    collection.push(audio);
    collection.push(audio);
    collection.push(audio);

    res.send(collection);
    next();
}

function queryAudio(req, res, next) {
    var condition = {};

    var from = req.params['from'];
    if(!util.isNullOrUndefined(from)) {
        from = parseInt(from);
        condition["order"] = {$gt: from};
    }

    var collection = db.collection('audios');
    var cursor = collection.find(condition).sort({order:1});

    cursor.count(function(err, count){
        cursor.limit(3).toArray(function(err, docs){

            res.charSet('utf-8');
            res.setHeader('X-Total-Count', count);

            ret = docs;

            res.send(ret);
            next();
        });
    });
}

function queryWeibos(req, res, next) {
    var condition = {};

    var from = req.params['from'];
    if(!util.isNullOrUndefined(from)) {
        from = parseInt(from);
        condition["createTime"] = from;
    }

    var collection = db.collection('weibos');
    var cursor = collection.find(condition).sort({createTime:1});

    cursor.count(function(err, count){
        cursor.limit(30).toArray(function(err, docs){
            ret = docs;
            res.charSet('utf-8');
            res.setHeader('X-Total-Count', count);
            res.send(ret);
            next();
        });
    });
}

function queryWeibos2(req, res, next) {
    var models = [];
    var totalCount = 0;

    var q = async.queue(onQueryCallback);
    q.drain = done;

    startQuery();

    function startQuery() {
        var condition = {};

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
                if(item != null) {
                    q.push(item);
                }
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
            name: true,
            avatarUrl: true
        };

        var objectId = new ObjectID(model.authorId);

        db.collection('users').findOne({_id: objectId}, userFields, function(err, user){
            model.authorName = user.name;
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

function queryWeibos3(req, res, next) {
    var models = [];
    var totalCount = 0;

    var q = async.queue(onQueryCallback);
    q.drain = done;

    startQuery();

    function startQuery() {
        var condition = {};

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
                if(item != null) {
                    q.push(item);
                }
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

        models.push(model);
        callback();
    }

    function done() {
        res.charSet('utf-8');
        res.setHeader('X-Total-Count', totalCount);
        res.send(models);
        next();
    }
}