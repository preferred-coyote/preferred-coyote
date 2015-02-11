var express = require('express');
var app = express();

require('./config/express')(app);
require('./routes')(app);

app.listen(process.env.PORT, function(){
  console.log('app listening on port ' + process.env.PORT);
});
