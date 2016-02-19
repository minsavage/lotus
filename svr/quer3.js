var async = require('async');
var ObjectID = require('mongodb').ObjectID;

function queryWeibos(req, res, next) {
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
            if(count == 0) {
                done();
                return;
            }

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
        model.objectId = item._id;
        model.createTime = item.createTime;
        model.updateTime = item.updateTime;
        model.content = item.content;
        model.commentCount = item.commentCount;
        model.likeCount = item.likeCount;
        model.authorId = item.authorId;

        var userFields = {
            name: true,
            avatarUrl: true
        }

        var objectId = new ObjectID(model.authorId);

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

exports.queryWeibos = queryWeibos;