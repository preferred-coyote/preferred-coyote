var router = require('express').Router();
var config = require('./config/environment');
var jwt = require('express-jwt');

// config function for application router
module.exports = function applicationRouter(app) {

  // define base route
  router.get('/', function(req, res, next) {
    res.render('index.ejs');
  });

  // inject api routes onto app
  require('./api/user')(app);
  require('./api/auth')(app);
  require('./api/interest')(app);

  // throw 404 for undefined assets and api endpoints
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(function(req, res, next) {
      res.status(404).end();
    });

  // catch all route to send to react
  router.get('/*', function(req, res, next) {
    res.render('index.ejs');
  });

  // mount router to application
  app.use(router);

};
