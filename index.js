require('babel-register')({
    presets: ['env']
  });
  require("babel-polyfill");
  exports = module.exports = require('./src/app')