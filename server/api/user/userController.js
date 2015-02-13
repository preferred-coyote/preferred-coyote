module.exports.list = function(req, res, next) {
  res.json([{
    id: 1,
    name: 'Bob'
  }, {
    id:2,
    name: 'Hank'
  }]);
};

module.exports.create = function(req, res, next) {
  res.status(201).json({
    message: 'User Created'
  });
};

module.exports.show = function(req, res, next) {
  var id = req.params.id;
  res.status(200).json({
    id: id,
    user: 'Bob'
  });
};

module.exports.update = function(req, res, next) {
  res.json({
    message: 'update a user'
  });
};
