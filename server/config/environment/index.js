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

  postgres: nconf.get('HEROKU_POSTGRESQL_BLACK_URL'),

  // Server port
  port: nconf.get('PORT') || 3000,

  //Secret for session, you will want to change this and make it an environment variable
  secret: {
    session: 'yo-soa-secret'
  },

  jwtTokenSecret: 'hellohello'

  /**
   * OAuth callbacks/config
   */
  // facebook: {
  //   clientID:     process.env.FACEBOOK_ID || 'id',
  //   clientSecret: process.env.FACEBOOK_SECRET || 'secret',
  //   callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  // },
  // twitter: {
  //   clientID:     process.env.TWITTER_ID || 'id',
  //   clientSecret: process.env.TWITTER_SECRET || 'secret',
  //   callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  // },
  // google: {
  //   clientID:     process.env.GOOGLE_ID || 'id',
  //   clientSecret: process.env.GOOGLE_SECRET || 'secret',
  //   callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  // }
};

/**
 * Export config vars based on environment ---
 * merge all config with environment or empty object
 */
module.exports = _.merge(all, require('./' + all.env + '.js') || {});
