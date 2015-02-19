var Reflux = require('reflux');
var actions = require('../actions/actions');

var profileStore = Reflux.createStore({
  // listenables: actions,

  // init: function() {
  //   this.interests = [];
  // },

  // updateInterests: function() {

  // },

  // addInterests: function(interests) {
  //   interests.forEach(function(interest) {
  //     if (this.interests.indexOf(interest) > -1) {
  //       this.interests.push(interest);
  //     }
  //   }, this);
  // },

  // deleteInterest: function() {

  // },

  // getDefaultData: function() {
  //   return {
  //     interest: this.interests,
  //     username: this.username
  //   };
  // }

});

module.exports = profileStore;
