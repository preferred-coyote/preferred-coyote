var router = require('express').Router();

// config function for application router
module.exports = function applicationRouter(app) {

  // define base route
  router.get('/', function(req, res, next) {
    res.send('Hello Worlds!');
  });

  // mount router to application
  app.use(router);

};
