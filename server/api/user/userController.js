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
        //user was created, return user
        res.status(201).json({
          user: user[0].dataValues,
          token: jwt.sign(user, config.jwtTokenSecret, {expiresInMinutes: 1000 })
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
  User.find({
    attributes: ['username', 'createdAt', 'profile', 'avatar'],

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

// edit user info
module.exports.editProfile = function(req, res, next) {

  var username = req.body.username,
      location = req.body.location,
      gender = req.body.gender,
      summary = req.body.summary,
      searchable = req.body.searchable;

  if (req.body) {
    User.find({
      where: {id: req.user[0].id}
    }).then(function(user) {
      user.update({
        location: location,
        gender: gender,
        summary: summary,
        searchable: searchable
      }).success(function() {
        res.status(200).json({message: 'PROFILE UPDATED!'});
      });
      return;
    }).catch(function(err) {

      });
    } else {
      res.status(300).json({message: 'fuck up'});
    }
};


module.exports.updatePassword = function(req, res, next) {
  //if we have a password and it's confirmed, try to update the password field
  if (req.user && req.user.id && req.body.newPassword && req.body.newPassword === req.body.newPasswordConfirmation){

    User.find({
      where: { id: req.user.id }
    }).then(function(user) {

      user.comparePasswords(req.body.oldPassword).then(function(isMatch){
        if (isMatch) {
          User.setPassword(req.body.newPassword).then(function(hash){
            user.updateAttributes({
              password: hash
            }).success(function(){
              //successfully updated the user's password
              res.status(200).json({
                message: "Password updated"
              });
              return;
            });
          }).catch(function(err){
            console.log('Error')
          });
        } else {
          res.status(400).json({
            message: "The old password was incorrect"
          });
        }
      });
    }).catch(function(err){
      res.status(500).json({
        message: err
      });
    });
  } else {
    return res.status(400).json({
      message: "Didnt get all the form data needed for password update"
    });
  }
  if (req.body.newPassword !== req.body.newPasswordConfirmation) {
    res.status(400).json({
      message: "Password confirmation mismatch"
    });
    return;
  }

};
