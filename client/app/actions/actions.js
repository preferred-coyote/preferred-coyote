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
          //window.sessionStorage.token = data.body.token;
          window.localStorage.setItem('token', data.body.token);
          window.localStorage.setItem('user', JSON.stringify(data.body.user));
          resolve(data.body.user);
        } else {
          reject({});
        }
      });
  });
};

actions.logout.preEmit = function() {
  // delete window.sessionStorage.token;
  window.localStorage.removeItem('token');
};

actions.signup.preEmit = function(creds) {

  return new Promise(function(resolve, reject) {
    request
      .post('/api/auth/signup')
      .set('Content-Type', 'application/json')
      .send({ username: creds.username, password: creds.password })
      .end(function(data) {
        resolve(data);
      });
  });
};

module.exports = actions;
