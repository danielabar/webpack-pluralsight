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
