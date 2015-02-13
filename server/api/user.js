var router = require('express').Router();

module.exports = function(app) {

  router.get('/user', function(req, res, next) {
    res.json({ name: 'Hank' });
  });

  // mount router onto /api
  app.use('/api', router);

};
