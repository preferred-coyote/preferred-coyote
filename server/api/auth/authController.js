var passport = require('passport');

var express = require('express');
var app = express();
var Promise = require('bluebird');
//Do we need JWT?
var jwt = require('jwt');


var authController = {

	login: function(req, res, next) {
		var username = req.body.username,
			password = req.body.password;
		return new Promise(function(resolve, reject) {
			User.find({
					where: {
						username: username
					}
				})
				.then(function(err, user) {
					if (err) {
						console.log(err);
					} else {
						if (!user) {
							next(new Error('User doesn\'t exist'));
						} else {
							return user.comparePasswords(password)
								.then(function(foundUser) {
									if (foundUser) {
										res.send(user);
									} else {
										return next(new Error('no user'));
									}
								})
						}
					}
				})
		})
	},

	signup: function(req, res, next) {
		var username = req.body.username,
			password = req.body.password;

		User.find({
				where: {
					email: email
				}
			})
			.complete(function(err, user) {
				if (err) {
					console.log(err)
				} else {
					if (user) {
						next(new Error('User already exists!'));
					} else {
						console.log('User created');
					}
				}
			})

		// check to see if user already exists
		Worker.find({
				where: {
					email: email
				}
			})
			.complete(function(err, worker) {
				if (err) {
					console.log(err)
				} else {
					if (worker) {
						next(new Error('Worker already exists!'));
					} else {
						console.log("User created");

						// Make a new user if doesn't yet exist
						newWorker = {
							email: email,
							accountType: accountType,
							name: name,
							'hourly_rate': hourly_rate,
							'summary': summary,
							skills: skills,
							location: location
						};

						if (img_url) {
							newWorker.img_url = img_url;
						}


						Worker.setPassword(password).then(function(password) {
							newWorker.password = password;
							// Save password to database here
							Worker.build(newWorker).save().complete(function(err, worker) {
								// create token to send back for auth
								if (err) {
									console.log(err)
								} else {
									console.log("auth token created");
									res.json(worker);
								}
							});
						});
					}
				}
			})
	},

	logout: function(req, res, next) {
		res.end("You're in login");
	}


};
