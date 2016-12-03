var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var moment = require('moment');
const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
const timeStamp = moment().format('LLLL');
const banner = `
 Generated on ${timeStamp} - ${localTimeZone}
 Description: ${pkg.description}
 Package: ${pkg.name}
 Version: v${pkg.version}
 Docs: ${pkg.homepage}
 License: ${pkg.license}
 Any questions, suggestions, or problems? Feel free to file an issue at:
 ${pkg.bugs}
 Notice:
 Do NOT edit this file below this point, any changes will be overwritten.
`;

var TimestampWebpackPlugin = require('timestamp-webpack-plugin');

module.exports = {
	context: path.resolve('js'),
	entry: ["./utils", "./app"],
	output: {
		path: path.resolve('build/js/'),
		publicPath: '/public/assets/js/',
		filename: "bundle.js"
	},
	devServer: {
		contentBase: 'public'
	},

	plugins: [
		// plugin to provide global variables
		// pass in an object where keys are aliases (global vars),
		// and values are the value the alias points to.
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
      'window.jQuery': 'jquery'
		}),

    // timestmap plugin creates a timestamp file for the last time webpack was run
    // accepts object with config parameters
    new TimestampWebpackPlugin({
      // place file in current directory
      path: __dirname,
      filename: 'timestamp.json'
    }),

    // new webpack.BannerPlugin('**********\nMy custom banner woo hoo!!!\n**********\n')
    new webpack.BannerPlugin(banner)
	],

	module: {
		loaders: [
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.es6']
	}
}