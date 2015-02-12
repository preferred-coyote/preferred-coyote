var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./environment');
var path = require('path');

// configure express
module.exports = function expressConfig(app) {

  // standard POST request body parser
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse json
  app.use(bodyParser.json());

  // HTTP request logger middleware
  app.use(morgan('combined'));

  // set static dir (public folder)
  app.use(express.static(path.join(config.root, 'public')));

  // set default view engine
  app.set('view engine', 'ejs');

  // set default view directory
  app.set('views', __dirname + '/../views');

  // set
  app.set('port', config.port);

};
