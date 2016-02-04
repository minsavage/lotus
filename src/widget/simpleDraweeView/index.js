/**
 * Created by danney on 16/1/19.
 */
module.exports = {
    name: 'SimpleDraweeView',
    //metadata: require('metadata'),
    codeBuildConfig: require('./codeBuildConfig'),
    layoutBuildConfig: require('./layoutBuildConfig'),
    //codeBuilder: require('./builder'),
    layoutBuilder: null
}


var z= {
    model: {
        default: require('...')
    },

    viewController: {
        default: '',
        ListViewController: '',
        TabViewController: ''
    },

    layout: {
        default: ''
    },

    widgetViewController: {
        'TextView': ''
    },

    widgetLayout: {
        'TextView': ''
    }
}


var x = {
    name: 'ListViewController',
    builders: {
        viewController: require('..////')
    }
}

var y = {
    name: 'default',
    viewController: '....',
    model: '...',
}