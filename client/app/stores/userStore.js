var Reflux = require('reflux');
var request = require('superagent');
var _ = require('lodash');
var actions = require('../actions/actions');

var Router = require('react-router');

var userStore = Reflux.createStore({

  listenables: actions,

  mixins: [ Router.Navigation],

  init: function() {
    var self = this;
    
    this.user = {
      profileCreated: !!window.localStorage.getItem('profileCreated'),
      loggedIn: !!window.localStorage.getItem('token'),
      user: JSON.parse(window.localStorage.getItem('user'))
    };

    if (this.user.loggedIn && !this.user.user.username) {
      request
        .post('/api/auth/check')
        .set('x-access-token', window.localStorage.getItem('token'))
        .set('Content-Type', 'application/json')
        .end(function(data) {
          if (data.body.user) {
            self.user = _.defaults(self.user, data.user);
          } else {
            self.user.loggedIn = false;
          }
          self.trigger(self.user.loggedIn);
        });
    }
  },

  login: function(user) {
    console.log("IN LOGIN", user);
    var self = this;
    user.then(function(user) {
      self.user = user;
      self.user.loggedIn = true;
      self.trigger(self.user.loggedIn);
    }).catch(function(err) {
      if (err === 'Incorrect username or password') {
        self.trigger(false);
      }
    })
  },

  signup: function(signinPromise){
    var self = this;
    signinPromise.then(function(data){
      //set user obj and loggedIn to true if status code 201
      console.log('signup', data.body);
      
      if (data.body.user){
        self.user = data.body.user;
        self.user.loggedIn = true;
        window.localStorage.setItem('token', data.body.token);
        window.localStorage.setItem('user', JSON.stringify(data.body.user));       
        
      } else {
        //username already exists
        self.user.loggedIn = false;

      }
      self.trigger(self.user.loggedIn);
    }).catch(function(err){

    })
  },
  
  isLoggedIn: function() {
    return this.user && this.user.loggedIn;
  },

  logout: function() {
    this.user = {
      loggedIn: false
    };
    this.trigger(this.user);
  },

  getUserData: function() {
    return this.user;
  },

  getInterests: function(getInterestsPromise) {
    var self = this;
    getInterestsPromise.then(function(interests) {
      self.userInterests = interests;
      console.log("THE USER INTERESTS", interests);
      self.trigger(interests);
    })
  },

  updateInterests: function(updateInterestsPromise) {
    var self = this;
    updateInterestsPromise.then(function(interests) {
      self.userInterests = interests;
      console.log("Updated interests store", interests);
      self.trigger(interests);
    })
  },

  isCreated: function() {
    return window.localStorage.profileCreated;
  },

  editProfile: function(user) {
    var self = this;

    user.then(function(data) {
      self.user = data.body;
      self.user.loggedIn = true;
      self.user.profileCreated = true;
      self.trigger(self.user);
    }).catch(function(err) {
      self.trigger(false);
    })
  }
});

module.exports = userStore;
