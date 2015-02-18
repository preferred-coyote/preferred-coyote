var jwt = require('express-jwt');
var config = require('./environment');

module.exports = function(app) {
	// define jwt route
  app.use('/api', jwt({
    secret: config.jwtTokenSecret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if(req.headers['x-access-token']){
        return req.headers['x-access-token'];
      }
      return null;
    }
  }));
};