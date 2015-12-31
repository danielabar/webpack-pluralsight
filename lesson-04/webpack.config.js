'use strict';

var path = require('path');

module.exports = {

  // Sets relative root directory for "entry" key
  context: path.resolve('js'),

  entry: [
    './utils.js',
    './app.js'
  ],

  output: {
    path: path.resolve('build/js/'),    // directory where bundle will go
    publicPath: '/public/assets/js/',   // where dev server will serve bundle from, matches index.html
    filename: 'bundle.js'
  },

  // So that requests for root / will serve public/index.html
  devServer: {
    contentBase: 'public'
  },

  module: {
    preLoaders: [
      {
        test: /\.es6$|\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }
    ],

    loaders: [
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }

  // watch: true

};
