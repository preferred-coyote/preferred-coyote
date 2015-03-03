var nconf = require('nconf');

// get environemnt variables
nconf
  .argv()
  .env();

module.exports = {
  db: nconf.get('CLEARDB_DATABASE_URL')
};
