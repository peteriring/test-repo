// Modules
const _ = require('lodash');

const buildConfig = require('./config.build');
const defaultConfig = require('./config.default');
const moduleConfig = require('./config.module');
const serveConfig = require('./config.serve');
const testConfig = require('./config.test');

module.exports = function makeWebpackConfig(options) {
  /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
  const TYPE = options.TYPE;
  const ENV = options.ENVIRONMENT;
  const configOptions = {
    devServerPort: 8080,
  };

  // Prepare config object
  let config = defaultConfig(ENV, configOptions);
  let newConfig;

  switch (TYPE) {
    case 'build':
      newConfig = buildConfig(ENV, configOptions);
      // Make sure to apply modules plugins first
      config.plugins = newConfig.plugins.push.apply(newConfig.plugins, config.plugins);
      merge(config, newConfig);
      break;
    case 'build-module':
      newConfig = moduleConfig(ENV, configOptions);
      // Make sure to apply modules plugins first
      config.plugins = newConfig.plugins.push.apply(newConfig.plugins, config.plugins);
      merge(config, newConfig);
      break;
    case 'serve':
      merge(config, serveConfig(ENV, configOptions));
      break;
    case 'test':
      config = testConfig(ENV, configOptions);
      break;
    default:
      break;
  }

  return config;
};

/**
 * Helper funciton for merging configs
 * @param  {[type]} destination [description]
 * @param  {[type]} source      [description]
 */
function merge(destination, source) {
  _.merge(destination, source, function m(a, b) {
    return (_.isArray(a)) ? a.concat(b) : undefined;
  });
}
