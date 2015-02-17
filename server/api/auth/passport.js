var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var User = require('../../models/');
var promise = require('bluebird');

module.exports = function(app) {
  // initialize passport on the app
  app.use(passport.initialize());
  /**
   * Local Strategy
   */
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log('AM I MAKING IT INTO PASSPORT.JS??');
      console.log(username);
      console.log(password);
      
      User.findOne({ username: username }, function(err, user) {
        console.log('I AM RIGHT BEFORE THE IF IN PASSPORT.JS');
        // return done if error
        if (err) {
          console.log('you erred in passport.js');
          return done(err);
        }
        // there isn't a user return done with false authentication
        if (!user) {
          console.log('no user in passport.js');
          return done(null, false, { message: 'Incorrect username.' });
        }
        // verify the password is correct
        user.comparePasswords(password, function(match){
          if(!match){
            console.log('no match in passport.js');
            return done(null, false, { message: 'Incorrect password.' });
          } else {

            console.log('correct password');
            return done(null, user);
          }
        });

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