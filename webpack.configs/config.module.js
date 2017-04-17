const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
.filter(function f(x) {
  return ['.bin'].indexOf(x) === -1;
}).forEach(function each(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = function module(ENV, options) {
  return {
    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    entry: path.join(__dirname, '..', 'app', 'index.js'),
    //context: path.resolve(__dirname),
    //resolve: {
    //    root: path.resolve(__dirname)
  //  },
    //context: path.resolve(__dirname),
    /**
     * Output
     * Reference: http://console.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    output: {
      // Absolute output directory
      path: path.join(__dirname, '..', 'www'),
      filename: 'index.js',
      libraryTarget: 'commonjs',
      library: '[name]',
    },

    externals: {
      angular: 'angular',
    },
    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: [

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),
    ],
  };
};
