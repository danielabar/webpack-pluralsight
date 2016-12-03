var path = require('path');

module.exports = {
	context: path.resolve('js'),
	entry: "./app",
	output: {
		path: path.resolve('build/js/'),
		publicPath: '/public/assets/js/',
		filename: "bundle.js"
	},
	devServer: {
		contentBase: 'public'
	},

	module: {
		loaders: [
      // run json through two loaders:
      //  1. custom strip comments
      //  2. webpack json-loader for require in project
      // path.resolve will place path to custom loader in loader string,
      // which lets webpack run that loader.
			{
        test: /.\json$/,
        exclude: /node_modules/,
        loader: 'json-loader!' + path.resolve('loaders/strip.js')
      }
		]
	},

	resolve: {
		extensions: ['', '.js', '.es6']
	}
}
