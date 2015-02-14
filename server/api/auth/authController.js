var passport = require('passport');

var express = require('express');
var app = express();
var Promise = require('bluebird');

var userController = require('../user/userController');
var User = require('../user/userModel.js');

module.exports.login = function(req, res, next) {
  var username = req.body.username,
      password = req.body.password;

  User.find({
    where: {
      username: username
    }
  })
  .then(function(user) {
    if (!user) {
      next(new Error('User doesn\'t exist'))
    } else {
      return User.comparePasswords(password)
      .then(function(foundUser) {
        if (foundUser) {
          res.send(user);
        } else {
          return next(new Error('no user'))
        }
      })
    }
  })
};

module.exports.signup = function(req, res, next) {
  var username = req.body.username,
      password = req.body.password,
      newUser;

  User.find({
    where: {
      username: username
    }
  }).complete(function(err, user) {
	  if (err) {
      console.log(err)
    } else {
      if (user) {
      	next(new Error('User already exists!'));
      } else {
        newUser = {
          username: username
        }
        User.setPassword(password).then(function(password) {
          newUser.password = password;
          User.build(newUser).save().complete(function(err, user) {
            if (err) {
              console.log(err);
            } else {
              console.log('Auth');
              res.json(user);
            }
          })
        })
      }
    }
  })
};
	
module.exports.logout = function(req, res, next) {
  req.session.destroy(function(){
    res.redirect('/');
  })
};

