'use strict';

module.exports = {

  entry: [
    './utils.js',
    './app.js'
  ],

  output: {
    filename: './dist/bundle.js'
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
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  },

  watch: true

};
