/**
 * Created by danney on 15/11/22.
 */

/**
 * 1、生成xml
 * 2、生成成员变量
 * 3、生成代码中xml的加载片段
 * 4、生成成员变量初始化（UI控件，VC，VM）
 * 5、生成子viewController的加载
 * 6、生成事件绑定
 * 7、生成ViewController 主框架
 * 8、递归生成sub vc
 * 9、生成page
 * 10、 生成application
 * */


var mainViewController = {
    'type': 'RelativeLayout',
    'id': 'rootLayout',
    'viewModel': 'mainViewModel',
    'event': {
        'onStart': function(){
            mainViewModel.query(function(){
                loadingView.stopAnimation();
                loadingView.visibility = 'gone';
            });

            loadingView.visibility = 'visible';
            loadingView.startAnimation();
        }
    },

    'units': [
     {
        type: 'RelativeLayout',
        layout: {
            width: 'match_parent',
            height: 'match_parent'
        },
        units: [{
            type: 'textView',
            id: 'textView_time',
            layout: {
                width: 'wrap_content',
                height: 'wrap_content',
                marginTop: '20dp'
            },
            text: '12:00',
            textColor: '#000000',
            textSize: '20dp'
        }, {
            type: 'viewController',
            id: 'playerViewController',
            layout: {
                width: '151dp',
                height: '151dp',
                below: 'textView_time',
                centerHorizontal: true
            },
            name: 'playerViewController'
        }]
    }]
}






//module.exports = mainViewController;


//1var layout = {
//    2    id: 'layout001',
//    3    componentType: 'layout',
//    4    componentConfig: {
//    5        minWidth: 1000,
//        6        units:[{
//        7            position: 'top',
//        8            height: 20,
//        9            id: 'menu001',
//        10            componentType: 'menu',
//        11            componentConfig:{
//        12                itemdata: [{
//            13                    text: "首页",
//            14                    url: 'index.html',
//            15                }, {
//        16                    text: '员工管理',
//            17                    submenu:{
//            18                        id: 'employee',
//                19                        itemdata:[{
//                20                            text: '基本信息',
//                21                            helptext: 'Ctrl + G',
//                22                            url: 'testpage/EmployeeInfo.html'}
//        23                        }]
//    24                    }
//25                }]
//26            }
//27        }, {
//    28            position: 'center',
//        29            id: 'table001',
//        30            componentType: 'table',
//        31            componentConfig:{
//        32                column: [
//            33                    {key:"Id", label: '编号'},
//            34                    {key:"Name", label: '姓名'},
//            35                    {key: "Gender", label: '性别'},
//            36                    {key:"Age", label: '年龄'},
//            37                    {key:"Address", label: '家庭住址'}
//            38                ],
//            39                dataSource: {
//            40                    type: 'remote',
//                41                    url: '/dbaction'
//            42                    sqlNumber: '002'
//            43                },
//        44                schema: {
//            45                   fields: ["Id","Name","Gender","Age","Address"]
//            46                },
//        47            }
//    48        }, {
//    49            position: 'bottom',
//        50            height: 32,
//        51            id: 'button001',
//        52            componentType: 'button',
//        53            componentConfig:{
//        54                label: '查看',
//            55                msg: [{
//            56                    type: 'P2P',
//            57                    msgId: 'OPEN',
//            58                    srcId: 'button001',
//            59                    destId: 'dialog001'
//        60                }]
//    61                map: 'tableViewerDispalyConfig'
//    62            }
//63        }]
//64    }
//65};