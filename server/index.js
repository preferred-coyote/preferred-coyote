var express = require('express');
var app = express();
var passport = require('passport');

// include jsx compiler
// require('node-jsx').install();

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/express')(app);
require('./routes')(app);

app.listen(process.env.PORT || 3000, function() {
	console.log('app listening on port ' + app.get('port'));
});