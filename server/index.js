var express = require('express');
var app = express();

require('./config/express')(app);
require('./routes')(app);

app.listen(app.get('port'), function(){
  console.log('app listening on port ' + app.get('port'));
});
