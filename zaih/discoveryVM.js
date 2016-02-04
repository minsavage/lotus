/**
 * Created by danney on 15/12/16.
 */
var catagoryViewModel = {
    name: 'CatagoryViewModel',

    fields: [
        {name: 'name', type: 'String'},
        {name: 'tabs', type: 'List<Tab>'},
        {name: 'experts', type: 'List<Expert>'}
    ]
}

var catagoryViewController = {
    name: 'CatagoryViewController',
    viewModel: {
        type: 'CatagoryViewModel',
        name: 'catagoryVM'
    },
    units: [
        {
            id: 'root',
            type: 'RelativeLayout',
            layout: {

            },
            units: [
                {
                    id: 'topBar',
                    type: 'RelativeLayout',
                    layout: {

                    },
                    units: [
                        {
                            id: 'backBtn',
                            type: 'Button',
                            layout: {

                            },
                            event: {
                                onClick: function(){

                                }
                            }
                        },
                        {
                            id: 'name',
                            type: 'TextView',
                            layout: {

                            },
                            text: '@{catagoryVM.name}'
                        }
                    ]
                },
                {
                    id: 'expertsTabViewController',
                    type: 'TabViewController',
                    tab: {
                        itemLayout: {
                            type: 'RelativeLayout',
                            layout: {

                            },
                            units: {

                            }
                        },
                        dataSource: {
                            type: 'static',
                            data: [
                                {

                                }
                            ]
                        }
                    }


                }
            ]
        }
    ]
}