
module.exports = {
    entry:'./App',
    output: {
        path:'',
        filename:'bundle.js'
    },

    devServer: {
        port: 3333,
        contentBase: '',
        colors: true,
        historyApiFallback: true,
        inline: true
    },

    module: {
        loaders: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }


}
