var webpack = require('webpack');
var ExtractPlugin = require('extract-text-webpack-plugin');
var extractCss = new ExtractPlugin('css/app.css');
module.exports = {
    devtol: 'source-map',
    entry: './src/js/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.ProvidePlugin({
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
        }),
        extractCss,
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                loader: 'url?limit=100000'
            },
            {
                test: /\.scss$/,
                loader: extractCss.extract(['css','sass'])
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        inline: true,
        watchOptions: {
            poll: true,
            aggregateTimeout: 300
        }
    }
};