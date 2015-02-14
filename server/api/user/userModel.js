var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var DB = require('../../db');

var User = DB.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  instanceMethods: {
    comparePasswords: function(candidatePassword) {
      var savedPassword = this.password;
      return new Promise(function(resolve, reject) {
        bcrypt.compare(candidatePassword, savedPassword, function(err, match) {
          if (err) {
            reject(err);
          } else {
            resolve(match);
          }
        });
      });
    }
  },
  classMethods: {
    setPassword: function(password) {
      return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, null, function(err, hash) {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        })
      });
    }
  }
});

module.exports = User;