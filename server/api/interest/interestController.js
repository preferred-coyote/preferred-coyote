module.exports.list = function(req, res, next) {
  res.json([{
    id: 1,
    name: 'Sports'
  }, {
    id:2,
    name: 'Cars'
  }]);
};

module.exports.create = function(req, res, next) {
  res.status(201).json({
    message: 'Interest Created'
  });
};

module.exports.show = function(req, res, next) {
  var id = req.params.id;
  res.status(200).json({
    id: id,
    user: 'Sports'
  });
};

module.exports.update = function(req, res, next) {
  res.json({
    message: 'update an interest'
  });
};
