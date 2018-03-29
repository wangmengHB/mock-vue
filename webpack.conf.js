let path = require('path')


module.exports = {
    entry: {
        "mock-vue": './src/index.js'
    },
    output: {
        path: path.join(__dirname, './test/'),
        filename: 'js/[name].js',
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}