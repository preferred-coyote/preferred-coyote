var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var DB = require('../../models');
var User = DB.User;
var promise = require('bluebird');

module.exports = function(app) {
  // initialize passport on the app
  app.use(passport.initialize());
  /**
   * Local Strategy
   */
  passport.use(new LocalStrategy(
    function(username, password, done) {

      User.find({
        where: {
          username: username
        }
      }).then(function(user) {
        // there isn't a user return done with false authentication
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        // verify the password is correct
        user.comparePasswords(password).then(function(match) {

          if (match) {
            // the password was correct
            return done(null, user, { message: 'Correct password' });
          } else {
            // there was an incorrect password
            return done(null, false, { message: 'Incorrect password' });
          }
        }).catch(function(err) {

          return done(null, false, { message: 'Incorrect password.' });
        });

      }).catch(function(err) {
        // there was an error
        if (err) {
          return done(err);
        }

      });

    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

};
