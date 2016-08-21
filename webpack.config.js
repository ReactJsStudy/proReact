module.exports = {
    entry: __dirname + '/app/app.js',
    devtool: 'source-map',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname,
        colors: true,
        historyApiFallback: true,
        inline: true
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: "babel",
            query: {
                presets: ["es2015", "stage-1", "react"]
            }
        },
        {
            test: /\.json$/,
            loader: 'json'
        },
        {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
};