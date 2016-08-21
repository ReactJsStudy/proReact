module.exports = {
    entry : [
        'babel-polyfill',
        __dirname + '/app_redux/App.js'
    ],
    output : {
        path : __dirname + '/public',
        filename : "bundle.js"
    },
    module:{
        loaders : [{
            test:/\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader : 'babel',
            query: {
              presets: ['react', 'es2015']
            }
        }]
    }
    ,
    devServer: {
        contentBase: __dirname +"/public",
        colors: true,
        historyApiFallback: true,
        inline: true
    }

};
