var router = require('express').Router();
var authController = require('./authController');

module.exports = function(app) {


	// login
	router.post('/login', authController.login);
	// signin
	router.post('/signin', authController.signin);
	// logout
	router.get('/logout', authController.logout);

	// mount router onto /api
	app.use('/api', router);


};