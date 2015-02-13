
var Sequelize = require('sequelize');
var config = require('../config/environment');
console.log(config);
var db = new Sequelize(config.database.name, config.database.user, config.database.pass, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

module.exports = db;
