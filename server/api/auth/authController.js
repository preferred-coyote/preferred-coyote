var passport = require('passport');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var config = require('../../config/environment');

var User = require('../../models').User;
var userController = require('../user/userController');

var createUser = require('../user/userController.js').create;

module.exports.login = function(req, res, next) {
  return passport.authenticate('local',function(err, user, info) {
    console.log('I\'M IN LOGIN!!!');
    console.log(user);
    console.log(info);
    if (err) {
      return res.status(500).end();
    }

    if(!user) {
      return res.status(404).json({message: 'Invalid'});
    }

    if(user) {
      delete user.password;
      console.log("USER IS ALIVE!!");
      res.send('HELLO');
      res.json({
        user: user,
        token: jwt.sign(user, config.jwtTokenSecret, {expiresInMinutes: 1000 })
      });
    }
  })(req, res, next);
};



  // var username = req.body.username,
  //     password = req.body.password;

  // User.find({
  //   where: {
  //     username: username
  //   }
  // })
  // .then(function(user) {
  //   if (!user) {
  //     next(new Error('User doesn\'t exist'));
  //     res.redirect('/login');
  //   } else {
  //     return user.comparePasswords(password)
  //       .then(function(foundUser) {
  //         if (foundUser) {
  //           res.status(200).json(user);
  //         } else {
  //           return next(new Error('no user'));
  //         }
  //       });
  //   }
  // });

module.exports.signup = function(req, res, next) {
  createUser(req, res, next);
  // var username = req.body.username,
  //     password = req.body.password,
  //     newUser;

  // User.find({
  //   where: {
  //     username: username
  //   }
  // }).complete(function(err, user) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (user) {
  //       next(new Error('User already exists!'));
  //       res.redirect('/signup');
  //     } else {

  //       newUser = {
  //         username: username
  //       };

  //       User.setPassword(password).then(function(password) {
  //         newUser.password = password;
  //         User.build(newUser).save().complete(function(err, user) {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             res.status(200);
  //             res.session.create();
  //           }
  //         });
  //       });
  //     }
  //   }
  // });
};

module.exports.logout = function(req, res, next) {
  req.session.destroy(function() {
    res.status(200);
  });
};

