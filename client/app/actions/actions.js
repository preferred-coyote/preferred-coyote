var Reflux = require('reflux');
var request = require('superagent');
var Promise = require('bluebird');

var actions = Reflux.createActions([
  // user actions
  'login',
  'logout',
  'signup',
  'updatePassword',
  'getInterests',
  'updateInterests',
  // , 'createProfile',
  'editProfile'
]);

actions.login.preEmit = function(creds) {
  return new Promise(function(resolve, reject) {
    request
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ username: creds.username, password: creds.password })
      .end(function(data) {
        console.log('IN ACTIONS, LOGIN', data.body);
        if (data.status === 404) {
          reject('Incorrect username or password');
        }
        if (data.body && data.body.user) {
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

actions.updatePassword.preEmit = function(formData){
  return new Promise(function(resolve, reject) {
    request
    .put('/api/user/profile/password')
    .set('x-access-token', window.localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json')
    .send({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      newPasswordConfirmation: formData.newPasswordConfirmation
    })
    .end(function(data){
      console.log("Line 62 actions", data);
      resolve(data);
    });
  })
};

actions.editProfile.preEmit = function(formData){
  return new Promise(function(resolve, reject) {
    request
    .put('/api/user/editprofile')
    .set('x-access-token', window.localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json')
    .send({
      location: formData.location,
      gender: formData.gender,
      summary: formData.summary,
      searchable: formData.searchable,
      profileCreated: formData.profileCreated
    })
    .end(function(data) {
      window.localStorage.setItem('profileCreated', true);
      console.log('is this data.body???', data);
      window.localStorage.setItem('user', JSON.stringify(data.body));
      resolve(data);
    });
  });
};


actions.getInterests.preEmit = function() {
  return new Promise(function(resolve, reject) {
    request
      .get('/api/profile/interests')
      .set('x-access-token', window.localStorage.getItem('token') || '')
      .end(function(response){
        resolve(response.body.interests);
      })
  })
};

actions.updateInterests.preEmit = function(interestsArray) {
  return new Promise(function(resolve, reject) {
    request
      .put('/api/profile/interests')
      .set('x-access-token', window.localStorage.getItem('token') || '')
      .set('Content-Type', 'application/json')
      .send({
        interests: interestsArray
      })
      .end(function(response) {
        resolve(response.body.interests);
      })
  });
};


module.exports = actions;
