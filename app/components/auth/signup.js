/** @jsx React.DOM */
var React = require('react');

var Button = require('../ui/button').Button;

var Login = React.createClass({
  render: function() {
    return ( 
    	<form className="form" role="form" action="/api/auth/login" method="POST">
	      <input type="text" name="username" placeholder="username"/>
	      <input type="password" name="password"/>
	      <button type="submit"> Login </button>
      </form>
    );
  }
});

module.exports.Login = Login;