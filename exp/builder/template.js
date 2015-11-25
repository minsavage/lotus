/**
 * Created by danney on 15/9/5.
 */
var fs = require('fs');

var tpl = {
    xmlRoot: fs.readFileSync('../template/layout/xmlRoot.js', 'utf-8'),
    type: fs.readFileSync('../template/layout/type2.js', 'utf-8'),
    namespace: fs.readFileSync('../template/layout/namespace.js', 'utf-8'),

    viewController: {
        main: fs.readFileSync('../template/viewController/viewControllerMain.js', 'utf-8'),

        memberVariableStmt: fs.readFileSync('../template/viewController/memberVariableStmt.js', 'utf-8'),

        viewModelStmt: fs.readFileSync('../template/viewController/viewModelStmt.js', 'utf-8'),
        viewModelInit: fs.readFileSync('../template/viewController/viewModelInit.js', 'utf-8'),
        viewModelDestroy: fs.readFileSync('../template/viewController/viewModelDestroy.js', 'utf-8'),
        viewModelObserverStmt: fs.readFileSync('../template/viewController/viewModelObserverStmt.js', 'utf-8'),


        subViewControllerInit: fs.readFileSync('../template/viewController/subViewControllerInit.js', 'utf-8'),

        viewControlInit: fs.readFileSync('../template/viewController/viewControlInit.js', 'utf-8')
    },

    listener: {
        onClickListener: fs.readFileSync('../template/listener/onClickListener.js', 'utf-8')
    },

    import: {
        androidWidget: fs.readFileSync('../template/import/androidWidget.js', 'utf-8'),
        viewModel: fs.readFileSync('../template/import/viewModel.js', 'utf-8'),
        viewController: fs.readFileSync('../template/import/viewController.js', 'utf-8')
    }
}

module.exports = tpl;