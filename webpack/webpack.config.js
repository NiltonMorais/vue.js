module.exports = {
    entry: './main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js',
        publicPath: '/dist/'
    }
};