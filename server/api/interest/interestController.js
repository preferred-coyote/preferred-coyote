var DB = require('../../models');
var Interest = DB.Interest;

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
  res.json({
    message: 'update an interest'
  });
};
