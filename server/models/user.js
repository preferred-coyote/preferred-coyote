var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
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
      associate: function(models) {
        User.belongsToMany(models.Interest);
      },
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
          });
        });
      }
    }
  });

  return User;

};
