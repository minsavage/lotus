/**
 * Created by danney on 16/2/4.
 */
module.exports = {
    ListViewModel: {
        viewModel: require('./listViewModelBuilder')
    },

    ListViewController: {
        viewController: require('./listViewControllerBuilder')
    }

    //default: {
    //    model: require('./model/modelBuilder'),
    //    operator: require('./operator/operatorBuilder'),
    //    viewModel: require('./viewModel/viewModelBuilder'),
    //    viewController: require('./model/modelBuilder'),
    //    page: require('./model/modelBuilder')
    //},
    //
    //operatorService: {
    //    operator: require('./model/modelBuilder')
    //}
}