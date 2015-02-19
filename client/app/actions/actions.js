var Reflux = require('reflux');
var request = require('superagent');
var Promise = require('bluebird');

var actions = Reflux.createActions([
  // user actions
  'login',
  'logout',
  'signup'
  // , 'createProfile',
  // 'updateProfile'
]);

actions.login.preEmit = function(creds) {
  return new Promise(function(resolve, reject) {
    request
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ username: creds.username, password: creds.password })
      .end(function(data) {
        if (data.body && data.body.user) {
          window.sessionStorage.token = data.body.token;
          resolve(data.body.user);
        } else {
          reject({});
        }
      });
  });
};

actions.logout.preEmit = function() {
  delete window.sessionStorage.token;
};

actions.signup.preEmit = function(creds) {
  return new Promise(function(resolve, reject) {
    request
      .post('/api/auth/signup')
      .set('Content-Type', 'application/json')
      .send({ username: creds.username, password: creds.password })
      .end(function(data) {
        console.log(data);
      });
  });
};

module.exports = actions;
