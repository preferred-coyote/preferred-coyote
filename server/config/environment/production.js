var nconf = require('nconf');

// get environemnt variables
nconf
  .argv()
  .env();

var match = nconf.get('CLEARDB_DATABASE_URL').match(/mysql:\/\/([^:]+):([^@]+)@([^:]+)\/(.+)\?/);

module.exports = {
  db: {
    user: match[1],
    pass: match[2],
    base: match[4],
    options: {
      dialect: 'mysql',
      protocol: 'mysql',
      host: match[3],
      port: 3306,
      logging: false,
      dialectOptions: {
        ssl: true
      }
    }
  }
};
