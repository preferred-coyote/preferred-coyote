var app = require('express')();

app.get('/', function(req, res, next){
  res.send('Hello World');
});

app.listen(process.env.PORT, function(){
  console.log('app listening on port ' + process.env.PORT);
});
