'use strict';

var path = require('path');
var webpack = require('webpack');

// Used to extract shared webpack code to common js file, to support multiple bundles
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('shared.js');

module.exports = {

  // Sets relative root directory for "entry" key
  context: path.resolve('js'),

  // Note that entry is now an object instead of array, each key is for each js bundle required
  entry: {
    about: './about_page.js',
    home: './home_page.js',
    contact: './contact_page.js'
  },

  output: {
    path: path.resolve('build/js/'),    // directory where bundle will go
    publicPath: '/public/assets/js/',   // where dev server will serve bundle from, matches index.html
    filename: '[name].js'               // no longer 'bundle.js', now it varies by entry name
  },

  plugins: [commonsPlugin],

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
