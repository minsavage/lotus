/**
 * Created by danney on 16/1/30.
 */
var restify = require('restify');
var MongoClient = require('mongodb').MongoClient;
var server;
var util = require('util');

//createServer();

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/lotus", function(err, database) {
    if(err) throw err;

    db = database;
    createServer();
});


function createServer() {
    server = restify.createServer();
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    server.get('/audios', queryAudio);

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