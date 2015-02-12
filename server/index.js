var express = require('express');
var app = express();

// include jsx compiler
require('node-jsx').install();

require('./config/express')(app);
require('./routes')(app);

app.listen(process.env.PORT || 3000, function() {
  console.log('app listening on port ' + app.get('port'));
});
