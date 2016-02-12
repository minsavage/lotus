/**
 * Created by danney on 16/2/4.
 */
module.exports = {
    TabViewController: {
        viewController: require('./tabViewControllerBuilder')
    },

    TabContainer: {
        widgetLayoutBuildConfig: require('./tabContainerLayoutBuildConfig')
    },

    TabBar: {
        widgetLayoutBuildConfig: require('./tabBarLayoutBuildConfig')
    },

    TabButton: {
        widgetLayoutBuildConfig: require('./tabButtonLayoutBuildConfig')
    }
}