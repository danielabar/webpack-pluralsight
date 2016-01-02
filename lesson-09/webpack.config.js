'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  // Sets relative root directory for "entry" key
  context: path.resolve('js'),

  // Application entrypoint
  entry: ['./app'],

  output: {
    path: path.resolve('build/'),      // directory where bundle will go
    publicPath: '/public/assets/',      // where dev server will serve bundle from, matches index.html
    filename: 'bundle.js'
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ],

  // So that requests for root / will serve public/index.html
  devServer: {
    contentBase: 'public'
  },

  module: {

    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
      },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }

  // watch: true

};
