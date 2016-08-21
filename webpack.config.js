module.exports = {
	entry : {
		app: ['babel-polyfill', './source/app.js']
		// contactApp: './example/contactApp.js'
		// search: './example/search.js',
		// greeter: './example/greeter.js'
	},
	output : {
		// path : './public',
		path: __dirname,
		filename : 'bundle.js'
	},
	module : {
		loaders : [{
			test : /\.jsx?$/,
			exclude: /(node_modules)/,
			loader : 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-0']
			}
		}]
	},
	devServer: {
		port: 3000
	},
	devtool: '#inline-source-map'
};