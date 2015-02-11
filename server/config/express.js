var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./environment');

// configure express
module.exports = function expressConfig(app){

  // standard POST request body parser
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse json
  app.use(bodyParser.json());

  // HTTP request logger middleware
  app.use(morgan('combined'));

  // set static dir (dist folder for now)
  app.use(express.static(__dirname + '/../../client/dist'));

  app.set('port', config.port);

};
