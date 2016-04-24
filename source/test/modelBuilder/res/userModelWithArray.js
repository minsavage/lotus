/**
 * Created by danney on 16/4/23.
 */

module.exports = {
    import: [
        'java.util.ArrayList'
    ],

    name: 'User',
    properties: [
        {name: 'name', type: 'string'},
        {name: 'age', type: 'int'},
        {name: 'gender', type: 'string'},
        {name: 'address', type: 'ArrayList<String>'}
    ]
}