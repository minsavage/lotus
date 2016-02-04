/**
 * Created by danney on 16/2/4.
 */
module.exports = {
    default: {
        model: require('model/modelBuilder'),
        operator: require('model/modelBuilder'),
        viewModel: require('model/modelBuilder'),
        viewController: require('model/modelBuilder'),
        page: require('model/modelBuilder')
    },

    operatorService: {
        operator: require('model/modelBuilder')
    }
}