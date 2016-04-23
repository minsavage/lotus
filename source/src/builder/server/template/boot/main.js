/**
 * Created by danney on 16/1/30.
 */
var restify = require('restify');
var util = require('util');
var db = require('./db');
var server;

{{import}}

db.connect(function(err, db){
    if(err) throw err;
    createServer();
})

function createServer() {
    server = restify.createServer();
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(function(req, res, next){
        res.charSet('utf-8');
        next();
    });

    {{pathBinding}}

    server.listen({{serverPort}}, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
}