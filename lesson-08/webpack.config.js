'use strict';

var path = require('path');

module.exports = {

  // Sets relative root directory for "entry" key
  context: path.resolve('js'),

  // Application entrypoint
  entry: ['./app'],

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

    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'   // first run css files through css-loader, then style-loader
      },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   loader: 'style-loader!css-loader!sass-loader'
      // },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }

  // watch: true

};
