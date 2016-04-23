var MongoClient = require('mongodb').MongoClient;

var db = null;

var connect = function(callback) {
    MongoClient.connect("mongodb://{{dbServerDomain}}:{{dbPort}}/{{dbName}}", function(err, database) {
        db = database;
        callback(err, db)
    });
}

var get = function() {
    return db;
}

exports.connect = connect;
exports.get = get;