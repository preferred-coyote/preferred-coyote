var express = require('express');
var bodyParser = require('body-parser');

// configure express
module.exports = function expressConfig(app){

  // standard POST request body parser
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse json
  app.use(bodyParser.json());

  // set static dir
  // app.use(express.static(__dirname + ))

};
