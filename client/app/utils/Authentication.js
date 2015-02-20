var userStore = require('../stores/userStore');

module.exports = {
  statics: {
    willTransitionTo: function(transition) {
      if(!userStore.isLoggedIn()) {
        transition.redirect('/login');
      }
    }
  }
};
