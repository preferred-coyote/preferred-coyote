var Reflux = require('reflux');
var actions = require('../actions/actions');

var userStore = Reflux.createStore({
  listenables: actions,

  init: function() {
    this.user = {
      loggedIn: false
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

  logout: function() {
    this.user = {
      loggedIn: false
    };
    this.trigger(this.user);
  },

  // updateUser: function(user) {
  //   this.user = user;
  //   this.trigger(this.user);
  // },



  getUserData: function() {
    return this.user;
  }
});

module.exports = userStore;
