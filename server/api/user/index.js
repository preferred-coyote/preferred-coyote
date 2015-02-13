var router = require('express').Router();
var userController = require('./userController');

module.exports = function(app) {

  router.get('/user', userController.list);

  // mount router onto /api
  app.use('/api', router);

};
