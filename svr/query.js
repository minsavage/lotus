/**
 * Created by danney on 16/2/15.
 */
var query = function(req, res, next) {
    var collection = db.collection('weibos');
    collection.find()


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


function queryAudio(req, res, next) {
    var viewModels = [];
    var cursor = db.collection('music').find();

    next();

    function next() {
        cursor.nextObject(function(err, doc){
            var viewModel = {};
            viewModel._id = item._id;
            viewModel.content = model.content;
            viewModel.pubTime = model.pubTime;
            viewModel.authorId = model.authorId;
            user.findOne({_id: model.authorId}, {name: true}).then(function(doc){
                viewModel.authorName = doc.name;
            }).then(function(){
                viewModels.push(viewModel);
                next();
            });
        });
    }
}

function queryWeibo(req, res, next) {
    var models = [];
    db.collection('weibos').find().each(function(err, item){
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
        })
    });
}

function queryWeibo(req, res, next) {
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


function queryWeibo(req, res, next) {
    console.log('queryWeibo enter');
    var viewModels = [];
    var promises = [];

    db.collection('weibo').find().each(function(err, weibo) {
        console.log('find completed');

        if(err) {
            res.send(err);
            next();
            return;
        }

        if(weibo == null) {
            console.log('Promise.all');
            Promise.all(promises).then(function(results) {
                console.log(viewModels);
                res.send(viewModels);
                next();
            });
            return;
        }

        var viewModel = {};
        var promise = Promise.resolve().then(function() {
            console.log('first query');
            viewModel.authorId = weibo.authorId;
            viewModel.content = weibo.content;
            viewModel.pubTime = weibo.pubTime;
            viewModel.commentCount = weibo.commentCount;
            viewModel.likeCount = weibo.likeCount;
            viewModel.fromDevice = weibo.fromDevice;
        }).then(function() {
            console.log('second query');
            console.log(weibo.authorId);
            //var id = "ObjectId(\'" + weibo.authorId + "\')";
            var id = new ObjectID(weibo.authorId);
            //var id = ObjectId(weibo.authorId);
            console.log(id);
            return db.collection('user').findOne({_id: id});
        }).then(function(user) {
            console.log('second query complete');
            if(user == null) {
                //todo error
                return;
            }

            console.log(user);
            viewModel.authorName = user.name;
            viewModel.authorAvatar = user.avatar;
            console.log(viewModel);
        }).then(function() {
            console.log('push to array');
            viewModels.push(viewModel);
        });

        promises.push(promise);
    });
}


exports.query = query;