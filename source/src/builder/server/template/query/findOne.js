var {{fieldsName}} = {
    {{fields}}
}

var objectId = new ObjectID(model.{{objectId}});

db.collection('{{collectionName}}').findOne({_id: objectId}, {{fieldsName}}, function(err, item){
    {{assignment}}
    models.push(model);
    callback();
});