var config = require('../config/environment');

var db = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

module.exports = db;
