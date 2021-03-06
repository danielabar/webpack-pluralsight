<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Webpack Fundamentals](#webpack-fundamentals)
- [Install](#install)
- [Config](#config)
- [Watch](#watch)
- [Dev Server](#dev-server)
- [Loaders](#loaders)
- [Running individual tasks](#running-individual-tasks)
- [Production vs Dev builds](#production-vs-dev-builds)
- [Project Organization](#project-organization)
- [Working with ES6 Modules](#working-with-es6-modules)
- [Sourcemaps](#sourcemaps)
- [Multiple Bundles](#multiple-bundles)
- [CSS & Style Loaders](#css-&-style-loaders)
  - [How CSS loading works](#how-css-loading-works)
  - [SASS](#sass)
  - [LESS](#less)
  - [Separate CSS bundle](#separate-css-bundle)
  - [Integrating Auto Prefixer](#integrating-auto-prefixer)
- [Add images and fonts to build](#add-images-and-fonts-to-build)
  - [Images](#images)
  - [Fonts](#fonts)
- [Webpack Tools](#webpack-tools)
  - [Creating a Custom Loader](#creating-a-custom-loader)
  - [Using Plugins](#using-plugins)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Webpack Fundamentals

> Learning Webpack with Pluralsight [course](https://app.pluralsight.com/library/courses/webpack-fundamentals/table-of-contents)

Replaces task runners such as Grunt and Gulp.
And is also a module loader, replaces RequireJS and Browserify.
Can load any module format such as AMD, CommonJS, ES6 modules.

Uses npm to manage all dependencies, not Bower.

Can also bundle css into the final bundle.js.

## Install

```shell
npm install -g webpack
```

## Config

With `webpack.config.js` file in place, just need to enter `webpack` at command line to run build.

Config file is a CommonJS module. Important keys are `entry` and `output`.

Note that `entry` can contain a list of files.

## Watch

To avoid manually having to re-run `webpack` whenever any input file changes.

One way to enter watch mode is at command line:

```shell
webpack --watch
```

Or set `watch` key to `true` in config file.

## Dev Server

Webpack can run a static server for development mode, with option to auto reload browser whenever any files change.

First install it:

```shell
npm install -g webpack-dev-server
```

Then run it:

```shell
webpack-dev-server
```

By default, starts a server at [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)

This runs your app in an iframe controlled by the webpack-dev-server, and places a webpack status bar at the top of the page. Changes to files are automatically refreshed in browser.

If you don't want the status bar visual, run:

```shell
webpack-dev-server --inline
```

Then go to [http://localhost:8080](http://localhost:8080)

## Loaders

To teach Webpack "new tricks". Loaders process files and can transform them into something else.

Add `module... loaders` section to webpack config.

`resolve` specifies what kind of files can be loaded without having to specify their extensions.

For example, using Babel for ES6 to ES5 transpiling, see [lesson-03/webpack.config.js](lesson-03/webpack.config.js)

For linting, JSHint uses a _pre-loader_. Preloaders run before the loaders do.

## Running individual tasks

Use npm scripts. For example, in `package.json`:

```
"scripts": {
  "start": "webpack-dev-server --inline"
}
```

Then run `npm start`.

## Production vs Dev builds

See lesson-03 folder.

For production, want minimized code, but not dev. Might also want to strip out console logs for production.

To mimimize and uglify code, these features are already built into Webpack, just add `-p` flag:

```
// package.json
"scripts": {
  "start": "webpack-dev-server --inline --watch",
  "prod": "webpack -p"
}

$ npm run prod
```

It's also possible to use a different config file for the production build.
For example, to strip out certain kinds of code, first install:

```shell
npm install strip-loader --save-dev
```

Create `webpack-production.config.js`. This file can extend the base config,
[example](lesson-03/webpack-production.config.js).

Configure strip loader by providing a comma separated list strings to be filtered out, for example `console.log`.

To use the production config:

```
// package.json
"scripts": {
  "start": "webpack-dev-server --inline --watch",
  "prod": "webpack --config webpack-production.config.js -p"
}

$ npm run prod
```
Now can use any web server such as `http-server` or nginx etc to serve the optimized build.

Can also use the webpack dev server to serve the optimzed build as follows:

```shell
webpack-dev-server -p
```

## Project Organization

See lesson-04 folder. A more realistic project organization.

Using output paths and devServer config as in [this example](lesson-04/webpack.config.js),
`bundle.js` file is not actually produced on disk, it's served up virtually by web server.

## Working with ES6 Modules

See lesson-05 folder.

To work with ES6 modules, configure Babel to process the es6 files, and convert to CommonJS syntax,
so that Webpack can understand it.

See [lesson-05/js/login.es6](lesson-05/js/login.es6) and [lesson-05/js/app.es6](lesson-05/js/app.es6)
for example of exporting a function from a module and using it in another.

## Sourcemaps

Continuing with lesson-05 folder.

Easy to add because its built into Webpack. Just add "-d" flag:

```shell
webpack -d
```

Now you can debug into the es6 source files separately, even though they're all in one bundle.js file.

Can also use source maps in production build:

```
// package.json
"scripts": {
  "start": "webpack-dev-server --inline --watch -d",
  "prod": "webpack --config webpack-production.config.js -p -d"
}
```

## Multiple Bundles

See lesson-06 folder. [lesson-06/webpack.config.js](lesson-06/webpack.config.js)

Useful for lazy loading. For example, if have different html files needing different js code.

Webpack adds some code into the bundle that it needs, don't want to duplicate this for multiple bundles,
pull it out to a shared file.

To extract shared common webpack code, add to config:

```javascript
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('shared.js');

module.exports = {

  plugins: [commonsPlugin],

  // ...
}
```

Make `entry` an object instead of array, and `output.filename` is now parameterized with `[name]`:

```javascript
entry: {
  about: './about_page.js',
  home: './home_page.js',
  contact: './contact_page.js'
},

output: {
  path: path.resolve('build/js/'),    // directory where bundle will go
  publicPath: '/public/assets/js/',   // where dev server will serve bundle from
  filename: '[name].js'               // no longer 'bundle.js', now it varies by entry name
}
```

## CSS & Style Loaders

See lesson-07 folder.

CSS can be used without referencing it as a link in the html. Start by installing the loaders:

```shell
npm install css-loader stye-loader --save-dev
```

These two loaders work together to put the styles into the page.
The `stye-loader` embeds the css in a style tag in the head section of html document.
The `css-loader` is used to process it.

Configuration:

```javascript
loaders: [
  {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: 'style-loader!css-loader'   // first run css files through css-loader, then style-loader
  }
]
```

`!` is Webpack syntax for chaining loaders. Files will be processed from right-most to left.

For bootstrap fonts, also need to install additional webpack loaders:

```shell
npm install file-loader url-loader --save-dev
```

Then configure loaders for the font files and urls, in the `loaders` section:

```javascript
// the url-loader uses DataUrls.
// the file-loader emits files.
{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
```

To actually bring in the css into the project, add a `require` statement to the entrypoint js file:

```javascript
require('../css/bootstrap.css');
require('../css/app.css');
```

### How CSS loading works

Note that in the Network tab, no request for css files occur.
But looking at generated index.html, note two style tags inserted in `<head>` section.

One is the bootstrap css inlined, the other is the custom app.css, again inlined.

The Webpack CSS and Style loaders create `<style>` tags in the html head and embed all the style information.

When webpack is run in production mode (-p flag), the embedded css will be minified.

### SASS

See lesson-08 folder.

To use SASS css pre-processor with Webpack. Start with installing the loader:

```shell
npm install sass-loader --save-dev
```

Add the sass loader to config file. This configuration will run .scss files through
first the sass-loader, then css-loader, and finally style-loader.

```javascript
{
  test: /\.scss$/,
  exclude: /node_modules/,
  loader: 'style-loader!css-loader!sass-loader'
}
```

Alternatively, for source maps, specify the loader config as follows:

```javascript
{
  test: /\.scss$/,
  loaders: ["style", "css?sourceMap", "sass?sourceMap"]
}
```

Then require the scss file from one of the js files, such as the main entry point, for example:

```javascript
// app.js
require('../css/app.scss');
```

### LESS

Similar to using SASS. Install loader:

```shell
npm install less-loader --save-dev
```

In webpack config, change `sass-loader` to `less-loader`, and change test regexp to look for less files.

In app entry, require the less file, `require('../css/app.less')`

### Separate CSS bundle

See lesson-09 folder.

To have the css loaded as a separate file, rather than embedded as style tag in document head.

Start by installing a webpack plugin:

```shell
npm install extract-text-webpack-plugin --save-dev
```

In webpack config, require the plugin:

```javascript
var ExtractTextPlugin = require('extract-text-webpack-plugin');
```

Change output to not build everything to to `build/js`:

```javascript
output: {
  path: path.resolve('build/'),      // directory where bundle will go
  publicPath: '/public/assets/',      // where dev server will serve bundle from, matches index.html
  filename: 'bundle.js'
}
```

Add plugins section, and call `new` on the extract text plugin function required earlier.
This function takes one parameter, which is the name of the generated css file.
Note that `plugins` section is an array:

```javascript
plugins: [
  new ExtractTextPlugin('styles.css')
]
```

Then change css and sass or less loader plugin configuration to use the plugin function instead of a string.

```javascript
loaders: [
  {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
  }
```

Change index.html now that path to bundle js is sipmly "assets", and add link for stylesheet:

```html
<link rel="stylesheet" type="text/css" href="/public/assets/styles.css">
...
<script type="text/javascript" src="/public/assets/bundle.js"></script>
```

To also have source maps, configure loader as follows:

```javascript
loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
...
loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')
```

### Integrating Auto Prefixer

See lesson-10 folder. For this exercise, have gone back to bundling css in the js file.

Install the auto prefixer loader:

```shell
npm install autoprefixer-loader --save-dev
```

Then modify scss loader config to run the compiled scss results through the autoprefix loader:

```javascript
{
  test: /\.scss$/,
  exclude: /node_modules/,
  loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
}
```

## Add images and fonts to build

The same loader can be used for both images and fonts.

### Images

See lesson-11 folder.

Install the url loader, which also installs the file loader module:

```shell
npm install url-loader --save-dev
```

Now add a loader to webpack config to load the images. Note that the url-loader accepts a parameter:

```javascript
{
  test: /\.(png|jpg)$/,
  exclude: /node_modules/,
  // 100K is actually too large, ideally would be ~10K
  loader: 'url-loader?limit=100000'
}
```

`limit` parameter means any image less than this size will be inlined as a base-64 encoded data,
thus no additional network requests needed to load it.

Any image bigger than limit will be created as a separate image and loaded as a separate request.
Copy of image is placed in the build directory when running `webpack`.

### Fonts

See lesson-12 folder.

The css now has `@font-face` declared with url's pointing to font files in the `fonts` directory.

Same url loader used for loading images can also be used to load fonts, note addition of font file extension to test regex in loader config:

```javascript
{
  test: /\.(png|jpg|ttf)$/,
  exclude: /node_modules/,
  loader: 'url-loader?limit=1000'
}
```

Limit parameter can also be used, if font file < limit, will be inlined, otherwise, will not and will be a separate request. Font files usually fairly large so not likely to be inlined.

## Webpack Tools

### Creating a Custom Loader

See lesson-13 folder.

If you need a task for which there is no existing loader, can write your own.

Example - strip comments out of json files. Assume project has a `config/config.json` which is read in for configuration values, but you also want to put comments for each config key, which is not valid json.

Start with `npm install json-loader --save-dev`. This is the json loader for webpack that supports loading json via `require`.

`npm install strip-json-comments --save-dev` is an npm module that strips comments out of json, but its not a webpack loader. Use it in `loaders/strip.js` to make a webpack loader that strips comments out of json.

### Using Plugins

See lesson-14 folder.

Loaders are smaller pieces that transform files. Plugins are more like grunt tasks and can operate on the entire bundle, so they can do things not possible with loaders.

Example - create a global variable `$` for jQuery. Add `plugins` section to `webpack.config.js`:

```javascript
plugins: [
  // plugin to provide global variables
  // pass in an object where keys are aliases (global vars),
  // and values are the value the alias points to.
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  })
]
```

Example - add banner add beginning of build to indicate where it came from and timestamp. Install from npm `timestamp-webpack-plugin`.

Banner functionality is built into webpack via existing plugin, but getting timestamp when webpack last ran is an additional plugin to install.

Open generated `bundle.js` to verify banner added:

```javascript
plugins: [
  // timestmap plugin creates a timestamp file for the last time webpack was run
  // accepts object with config parameters
  new TimestampWebpackPlugin({
    // place file in current directory
    path: __dirname,
    filename: 'timestamp.json'
  }),

  new webpack.BannerPlugin('**********\nMy custom banner woo hoo!!!\n**********\n')
]
```
