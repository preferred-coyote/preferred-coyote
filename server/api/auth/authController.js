var passport = require('passport');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var config = require('../../config/environment');

var User = require('../../models').User;
var userController = require('../user/userController');

var createUser = require('../user/userController').create;

module.exports.login = function(req, res, next) {
  //goes through Passport first
  passport.authenticate('local', function(err, user, info) {

    if (err) {
      return res.status(500).json({
        message: 'Error Authenticating'
      });
    }

    // if there is no user
    if (!user) {
      return res.status(404).json({ message: 'Bad User/Login' });
    }

    //delete password and send back user with jwt token
    if (user) {
      delete user.dataValues.password;
      res.status(200).json({
        user: user.dataValues,
        token: jwt.sign(user, config.jwtTokenSecret, {expiresInMinutes: 1000 })
      });
    }
  })(req, res, next);
};

module.exports.signup = function(req, res, next) {
  //this is being called on form submit of signup page

  createUser(req, res, next);
};

module.exports.logout = function(req, res, next) {
  req.session.destroy(function() {
    res.status(200);
  });
};

module.exports.check = function(req, res, next) {
  if (!req.user) {
    res.json({
      message: 'Bad Token'
    });
  } else {
    res.json({
      user: req.user
    });
  }
};
