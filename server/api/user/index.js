var router = require('express').Router();
var userController = require('./userController');

module.exports = function(app) {

  // list all users
  router.get('/user', userController.list);
  // create a user
  router.post('/user', userController.create);
  // get a specific user
  router.get('/user/:id', userController.show);
  // update a specific user
  router.put('/user/:id', userController.update);

  // mount router onto /api
  app.use('/api', router);

};
