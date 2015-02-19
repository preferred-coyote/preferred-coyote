var DB = require('../../models');
var Interest = DB.Interest;
var User = DB.User;
var Promise = require('bluebird');

module.exports.list = function(req, res, next) {
  Interest.findAll().then(function(interests) {
    res.status(200).json(interests);
  }).catch(function(err) {
    res.status(500).end();
  });
};

module.exports.create = function(req, res, next) {
  res.status(201).json({
    message: 'Interest Created'
  });
};

module.exports.show = function(req, res, next) {
  var id = req.params.id;
  Interest.find({
    where: {
      id: id
    },
    include: [DB.User]
  }).then(function(interests) {
    res.json(interests);
  }).catch(function(err) {
    console.log(err);
    res.status(500).end();
  });
};

module.exports.update = function(req, res, next) {
  var user = req.params.id; // TODO: this should be the authenticated user (req.user)
  var interests = req.body.interests;

  /**
   * Find or create all interests and return
   * into a promise map - when completed find the user object
   * and associate interests with that user
   */
  Promise.map(interests, function(name) {
    return Interest.findOrCreate({
      where: {
        name: name
      },
      defaults: {
        name: name
      }
    });
  }).then(function(interests) {
    // interest is array // map directly to interest data
    interests = interests.map(function(interest) {
      return interest[0];
    });
    // get current user
    User.find({
      where: {
        id: user
      }
    }).then(function(user) {
      // set the interests
      user.setInterests(interests).then(function(user) {
        res.json({
          message: 'Interests updated',
          interests: interests // send back interests
        });
      }).catch(function(err) {
        // error setting interests
        res.json({ message: err });
      })
    });
  }).catch(function(err) {
    // error mapping promise / findOrCreating interests
    res.status(500).json({
      message: err
    });
  });

};
