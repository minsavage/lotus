/**
 * 测试目标：看是否能把一个function对象直接tostring，获得这个function的源代码
 * 测试结论：可以获取源代码，非常赞
 */
var onClick = function() {
    var i = 0;
}

function onOpen() {
    var s = 1;
}

var s = onClick.toString();
console.log(s);
var p = s.lastIndexOf('}');
s = s.substring(0, p);

console.log(s);

s = s.replace('function () {', '').trim();

console.log(s);

console.log(onOpen.toString());


var x = {
    dependencies: {

    },

    import: [
        'xxxxx',
        'xxxxx',
        'xxxxx'
    ],

    beforeOnCreate: '.....',
    onCreate: '.....',
    onCreateView: '',

    event: {
        onClick: {
            init: '{{obj}}.setOnClickListner({{obj}}OnClickListner);',
            impl:tpl.onClick
        }
    }
}



class MyList extend Compoent {
    render () {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
            />
        );
    }

    dataSource: {
        ....
    }

    renderMovie () {
        do something
    }
}


class WeiboViewModel {
    private User user;
}

class WeiboViewModel {
    private String name;
    priate  String age;
    String gender;
}

showAlertView([
    {title: '打开', handler: function() {

    }},

    {title: ''}
])


function() {
    status = Enum.LoadingStatus;

    showPage('UserPage', {
        name: 'ViewMode.name'
    })
}


onCreateView: {
    userVM.name = getPara('name');
    userVM.name = getPara('name');
}