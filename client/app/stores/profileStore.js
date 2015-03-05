var Reflux = require('reflux');
var request = require('superagent');
var _ = require('lodash');
var actions = require('../actions/actions');
var userStore = require('./userStore');

var profileStore = Reflux.createStore({
  // listenables: actions,

  // init: function(){
  //   this.user = {
  //   	// profileCreated: JSON.parse(window.localStorage.getItem('user')).profileCreated
  //   }
  // },

  // profileCreated: function() {
  // 	return this.user.profileCreated;
  // }

  // // onCreate: function() {
  // // 	console.log('I AM IN THE PROFILESTORE');
  // // 	if(this.user.profileCreated)
  // // }

});

module.exports = profileStore;