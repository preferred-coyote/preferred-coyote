var DB = require('../../models');
var User = DB.User;
var Interest = DB.Interest;
var jwt = require('jsonwebtoken');
var config = require('../../config/environment');

// get all the users
module.exports.list = function(req, res, next) {

  // page needs to be greater than 0 and present
  var page = req.query.page && req.query.page > 0
    ? req.query.page
    : 1; // otherwise its the first page

  // limit queries per page to 25 or less
  var limit = req.query.limit && req.query.limit <= 25
    ? req.query.limit
    : 12; // default to 12 per page

  /**
   * list route is a paginated list of users
   * page and limit query paramaters allow pagination
   * queries from the frontend
   */
  User.findAndCountAll({
    attributes: ['username', 'profile', 'createdAt'],
    limit: limit,
    offset: page-1 // offset is 0 index
  }).then(function(users) {
    res.status(200).json({
      page: page, // display current page
      limit: limit, // display query limit
      total_users: users.count, // total number of users
      next_page: (page * limit) < users.count, // boolean for whether there is a next pages
      users: users.rows // the data
    });
  }).catch(function(err) {
    // there was an errorr in the query
    res.status(500).json({
      message: 'Internal Server Error'
    });
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

  User.setPassword(password).then(function(hash) {

    User.findOrCreate({
      where: {
        username: username
      },
      defaults: {
        username: username,
        password: hash
      }
    }).then(function(user) {
      /**
       * user[1] is a boolean for whether it was found or created
       * true === user is created
       * false === user was found
       */
      var created = user[1];
      if (created) {
        res.status(201).json({
          message: 'User created.'
        });
      } else {
        res.status(409).json({
          message: 'Username taken.'
        });
      }
    });
  });

};

// view a user profile
module.exports.show = function(req, res, next) {
  var id = req.params.id;

  res.json({ foundUser: req.foundUser });

  User.find({
    where: {
      id: id
    },
    include: [DB.Interest]
  }).then(function(user) {
    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
    }
    res.json(user);
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({
      message: 'Error'
    });
  });
};

// update a user
module.exports.update = function(req, res, next) {
  var id = req.params.id || req.user.id;
  User.find(id).then(function(user) {
    if (user) {
      user.updateAttributes(req.body).then(function() {
        return res.status(204).json({
          message: 'User updated'
        });
      }).catch(function(err) {
        return res.status(500).json({
          message: 'Error updating resource'
        });
      })
    }
  }).catch(function(err) {
    return res.status(500).json({
      message: 'Error updating resource'
    });
  })
};
