var router = require('express').Router();
var userController = require('./userController');
var User = require('../../models').User;

module.exports = function(app) {

  /**
   * Get the user id before it reaches controller
   * this is useful because we most likely need
   * the user object on all user routes anyway.
   * we can get it ahead of time to reduce code duplication
   * and simplify controller logic.
   */
  router.param('id', function(req, res, next, id) {
    // find user
    User.find(id).then(function(user) {
      // no user found
      if (!user) {
        res.status(404).json({
          message: 'No user found'
        });
      }
      // user found, continue
      req.foundUser = user;
      // continue to next
      return next();
    }).catch(function(err) {
      // error -- TODO
      res.status(404).json({
        message: 'No user found'
      });
    })
  });

  /**
   * protect post/update/delete routes
   * from users who don't own that resource
   */
  router.all('*', function(req, res, next) {
    // skip over the create path
    if (req.path === '/auth/signup') return next();
    // continue if its a get request or if its to create a user
    if (req.method === 'GET') return next();
    // there is no auth'd user
    if (!req.user) return res.status(401).json({
      message: 'Not authorized'
    });
    // continue if the user who is modifying the resource owns it
    if (req.user.id === req.foundUser.id) return next();
    // otherwise its forbidden
    return res.status(401).json({
      message: 'Not authorized'
    });
  });

  // list all users
  router.get('/user', userController.list);
  // create a user
  router.post('/user', userController.create);
  // get a specific user
  router.get('/user/:id', userController.show);
  // update a specific user
  router.put('/user/:id', userController.update);
  router.put('/user/profile', userController.update);

  // mount router onto /api
  app.use('/api', router);

};
