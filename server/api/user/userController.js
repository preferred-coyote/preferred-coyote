var User = require('./userModel');

// get all the users
module.exports.list = function(req, res, next) {

  User.findAll().success(function(users) {
    res.json(users);
  });

};

/**
 * Create a user
 */
module.exports.create = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      message: 'Username and password are required'
    });
  }

  User.findOrCreate({
    where: {
      username: username
    },
    defaults: {
      username: username,
      password: password
    }
  }).then(function(user) {
    /**
     * user[1] is a boolean for whether it was found or created
     * true === user is created
     * false === user was found
     */
    var created = user[1];
    if (created) {
      res.status(201).json(user);
    } else {
      res.status(409).json({
        message: 'Username taken.'
      });
    }
  });
};

// view a user profile
module.exports.show = function(req, res, next) {
  var id = req.params.id;
  User.find(id).success(function(user) {
    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
    }
    res.json(user);
  }).error(function() {
    res.status(500).json({
      message: 'Error'
    });
  })
};

// update a user
module.exports.update = function(req, res, next) {
  var id = req.params.id;
  User.find(id).success(function(user) {
    if (user) {
      // update user attributes
      // user.updateAttributes()
    }
  });
};