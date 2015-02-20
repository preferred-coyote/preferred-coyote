var Reflux = require('reflux');
var actions = require('../actions/actions');

var userStore = Reflux.createStore({
  listenables: actions,

  init: function() {
    this.user = {
      loggedIn: window.sessionStorage.token || false
    };
  },

  login: function(user) {
    var self = this;
    user.then(function(user) {
      self.user = user;
      self.user.loggedIn = true;
      self.trigger(self.loggedIn);
    }).catch(function(err) {
      console.log('error authenticating');
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
  }

});

module.exports = userStore;
