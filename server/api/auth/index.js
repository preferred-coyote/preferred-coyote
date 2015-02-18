var router = require('express').Router();
var authController = require('./authController');

module.exports = function(app) {


	// login
  router.post('/login', authController.login);
  // signin
  router.post('/signup', authController.signup);
  // logout
  router.get('/logout', authController.logout);

  // mount router onto /api
  app.use('/api/auth', router);


};