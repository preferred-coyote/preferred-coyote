var Reflux = require('reflux');
var actions = require('../actions/actions');

var userStore = Reflux.createStore({
  listenables: actions,

  init: function() {
    this.user = {
      loggedIn: !!window.localStorage.getItem('token')
    };
  },

  login: function(user) {
    var self = this;
    user.then(function(user) {
      self.user = user;
      self.user.loggedIn = true;
      self.trigger(self.user.loggedIn);
    }).catch(function(err) {
      console.log('error authenticating', err);
    })
  },

  signup: function(signinPromise){
    var self = this;
    signinPromise.then(function(data){
      //set user obj and loggedIn to true if status code 201
      if (data.status === 201){
        self.user = data.body.user;
        self.user.loggedIn = true;
        //window.sessionStorage.token = data.body.token;
        window.localStorage.setItem('token', data.body.token);

      } else if (data.status === 409){
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
  }

});

module.exports = userStore;
