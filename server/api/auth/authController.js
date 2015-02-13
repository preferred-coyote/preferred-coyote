var passport = require('passport');

var AuthController = {
	list: function(req, res, next) {
		res.json([{
			id: 1,
			name: 'Bob'
		}, {
			id: 2,
			name: 'Hank'
		}]);
	};

	create: function(req, res, next) {
		res.status(201).json({
			message: 'User Created'
		});
	};

	show: function(req, res, next) {
		var id = req.params.id;
		res.status(200).json({
			id: id,
			user: 'Bob'
		});
	};

	update: function(req, res, next) {
		res.json({
			message: 'update a user'
		});
	};


}