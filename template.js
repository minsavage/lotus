/**
 * Created by danney on 15/9/5.
 */
var fs = require('fs');

var tpl = {
    xmlRoot: fs.readFileSync('template/layout/xmlRoot.js', 'utf-8'),
    type: fs.readFileSync('template/layout/type.js', 'utf-8'),
    namespace: fs.readFileSync('template/layout/namespace.js', 'utf-8'),

    common: {
        class: fs.readFileSync('template/common/class.js', 'utf-8'),
        mVariableStmt: fs.readFileSync('template/common/mVariableStmt.js', 'utf-8')
    },

    viewController: {
        main: fs.readFileSync('template/viewController/main.js', 'utf-8'),
        viewModelInit: fs.readFileSync('template/viewController/viewModelInit.js', 'utf-8'),
        viewModelDestroy: fs.readFileSync('template/viewController/viewModelDestroy.js', 'utf-8'),
        viewModelObserverStmt: fs.readFileSync('template/viewController/viewModelObserverStmt.js', 'utf-8'),
        subViewControllerInit: fs.readFileSync('template/viewController/subViewControllerInit.js', 'utf-8'),
        viewControlInit: fs.readFileSync('template/viewController/viewControlInit.js', 'utf-8')
    },

    listener: {
        onClickListener: fs.readFileSync('template/listener/onClickListener.js', 'utf-8')
    },

    import: {
        androidWidget: fs.readFileSync('template/import/androidWidget.js', 'utf-8'),
        viewModel: fs.readFileSync('template/import/viewModel.js', 'utf-8'),
        viewController: fs.readFileSync('template/import/viewController.js', 'utf-8')
    },

    model: {
        main: fs.readFileSync('template/model/main.js', 'utf-8'),
        get: fs.readFileSync('template/model/get.js', 'utf-8'),
        set: fs.readFileSync('template/model/set.js', 'utf-8'),
        getBoolean: fs.readFileSync('template/model/getBoolean.js', 'utf-8')
    },

    modelOperator: {
        remoteQueryCollection: fs.readFileSync('template/modelOperator/remoteQueryCollection.js', 'utf-8'),
        remoteImport: fs.readFileSync('template/modelOperator/remoteImport.js', 'utf-8'),
        localQueryObject: fs.readFileSync('template/modelOperator/localQueryObject.js', 'utf-8'),
        localSaveObject: fs.readFileSync('template/modelOperator/localSaveObject.js', 'utf-8'),
        localImport: fs.readFileSync('template/modelOperator/localImport.js', 'utf-8'),
        remoteOperatorService: fs.readFileSync('template/modelOperator/remoteOperatorService.js', 'utf-8')
    },

    viewModel: {
        operatorQuery: fs.readFileSync('template/viewModel/operatorQuery.js', 'utf-8'),
        operatorAction: fs.readFileSync('template/viewModel/operatorAction.js', 'utf-8'),
        main: fs.readFileSync('template/viewModel/main.js', 'utf-8')
    }
}

module.exports = tpl;