var path = require('path');
var nconf = require('nconf');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// get environemnt variables
nconf
  .argv()
  .env();

/**
 * config across all environments
 */
var all = {
  env: nconf.get('NODE_ENV') || 'development',

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: nconf.get('PORT') || 3000,

  //Secret for session, you will want to change this and make it an environment variable
  secret: {
    session: 'yo-soa-secret'
  },

  jwtTokenSecret: 'hellohello'

};

/**
 * Export config vars based on environment ---
 * merge all config with environment or empty object
 */
module.exports = _.merge(all, require('./' + all.env + '.js') || {});
