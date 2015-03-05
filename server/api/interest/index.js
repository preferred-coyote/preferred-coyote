var router = require('express').Router();
var interestController = require('./interestController');

module.exports = function(app) {


  // list all users
  router.get('/interest', interestController.list);
  // create a user
  router.post('/interest', interestController.create);
  // get a specific user
  router.get('/profile/interests', interestController.show);
  // update a specific user
  router.put('/profile/interests', interestController.update);

  // mount router onto /api
  app.use('/api', router);

};
