/**
 * Created by danney on 16/5/25.
 */
var converter = function(queryForums) {
    if(queryForums == null ||
        queryForums.content == null ||
        queryForums.content.recom == null) {
        error(100);
        return null;
    }

    if(queryForums.retCode != 0) {
        error(101, queryForums.msg);
        return null;
    }

    return queryForums.content.recom;
}

var converter2 = function(forums) {

}{

}

module.exports = [
    {
        op: 'map',
        action: function(queryPosts) {
            if(queryPosts == null) {
                error(101, "");
                return null;
            }
        }
    }
]

module.exports = {
    map: function(queryPostsRet) {
        if(queryPostsRet != null) {
            return queryPostsRet.content.posts;
        }
    },

    map: function(posts) {
        var array = [];
        for(int i = 0; i < posts.size; i ++) {
            var a = posts.name;
            array.push(a);
        }
        return array;
    },

    filter: function() {
        showPage('UserPage', {
            userid: vm.user.id
        })
    }

    vm.userid = getParamert("userid");
}


