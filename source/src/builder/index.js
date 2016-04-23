/**
 * Created by danney on 16/2/4.
 */
module.exports = {
    default: {
        page: require('./page/pageBuilder'),

        model: require('./model/modelBuilder'),
        operator: require('./operator/operatorBuilder'),
        viewModel: require('./viewModel/viewModelBuilder'),

        viewController: require('./viewController/viewControllerBuilder'),
        layout: require('./viewController/layoutBuilder'),

        widget: require('./widget/widgetBuilder'),
        widgetLayout: require('./widget/widgetLayoutBuilder'),

        function: require('./function/functionBuilder'),

        enum: require('./enum/enumBuilder')
    },

    remoteOperatorService: {
        operator: require('./operator/remoteOperatorServiceBuilder')
    }
}