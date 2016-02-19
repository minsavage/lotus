var {{fieldsName}} = {
    {{fields}}
}

var cursor = db.collection('{{collectionName}}').find(condition, {{fieldsName}}){{sort}};

cursor.count(function(err, count){
    if(count == 0) {
        done();
        return;
    }

    totalCount = count;
    cursor.limit({{limit}}).each(function(err, item){
        if(item != null) {
            q.push(item);
        }
    });
});