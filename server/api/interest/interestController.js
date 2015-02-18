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


};
