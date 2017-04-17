const fs = require('fs');
const path = require('path');
const convict = require('convict');
require('dotenv').config();

const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'demo', 'development', 'local', 'test'],
    default: 'local',
    env: 'NODE_ENV',
  },
  imageUrl: {
    doc: 'url of the image source',
    format: function check(value) {
      if (!/^https?/.test(value)) {
        throw new Error('must have a protocol');
      }
    },
    default: 'http://lorempixel.com/',
    env: 'API_URL',
  },
  socketIOUrl: {
    doc: 'Path to reach socket.io backend.',
    default: 'http://185.13.90.140:8081/',
    env: 'SOCKET_IO_URL',
  },
});

module.exports = (() => {
  config.validate({ strict: true });
  const settings = config.getProperties();
  const stream = fs.createWriteStream(path.join(__dirname, '..', 'app', 'config.js'));
  fs.createReadStream(path.join(__dirname, '..', 'config', 'config.js'), 'utf-8')
    .on('data', chunk => stream
      .write(chunk
      .replace('@@env', settings.env)
      .replace('@@imageUrl', settings.imageUrl)
      .replace('@@socketIOUrl', settings.socketIOUrl)));
  console.log('CONFIG:', config.toString());
  return config;
})();
