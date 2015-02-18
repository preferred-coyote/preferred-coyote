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
      return res.status(500).end();
    }

    // if there is no user
    if (!user) {
      return res.status(404).json({ message: 'Invalid' });
    }

    //delete password and send back user with jwt token
    if (user) {
      delete user.password;
      res.json({
        user: user,
        token: jwt.sign(user, config.jwtTokenSecret, {expiresInMinutes: 1000 })
      });
    }
  })(req, res, next);
};

module.exports.signup = function(req, res, next) {
  console.log('hello');
  createUser(req, res, next);
};

module.exports.logout = function(req, res, next) {
  req.session.destroy(function() {
    res.status(200);
  });
};

